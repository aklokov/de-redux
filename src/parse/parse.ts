import { Model } from './model';
import * as fse from 'fs-extra';
import { mergeModels, createFileImport } from '.';
import { isDirectory, combinePath } from '../tools';
import { collectState, collectReduction } from './collectRedux';
import { Options } from '../Options';
import { constants } from '../constants';

export async function parseFiles(options: Options, path: string): Promise<Model> {
  const files = await fse.readdir(path);
  const promises = files.map(file => collectFile(options, path, file));
  const models = await Promise.all(promises);
  return mergeModels(models.filter(model => model));
}

async function read(path: string, file: string): Promise<string> {
  return fse.readFile(combinePath(path, file), 'utf8');
}

async function collectFile(options: Options, path: string, file: string): Promise<Model> {
  if (await isDirectory(combinePath(path, file))) {
    return await parseFiles(options, combinePath(path, file));
  }

  if (file.endsWith(constants.stateExt)) {
    const content = await read(path, file);
    const imp = await createFileImport(path, file);
    const states = collectState(options, imp, file, content);
    return { reductions: [], states };
  }

  if (file.endsWith(constants.reductionExt)) {
    const content = await read(path, file);
    const imp = await createFileImport(path, file);
    const reductions = collectReduction(options, imp, file, content);
    return { reductions, states: [] };
  }

  return null;
}
