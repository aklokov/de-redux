import { Model } from './model';
import * as fse from 'fs-extra';
import { mergeModels } from '.';
import { isDirectory, combinePath, trimExtension } from '../tools';
import { collectState, collectReduction } from './collectRedux';
import { collectFileInfo } from './collectFileInfo';
import { Options } from '../Options';
import { constants } from '../constants';
import * as changeCase from 'change-case';

export async function parseFiles(options: Options, path: string): Promise<Model> {
  const files = await fse.readdir(path);
  const promises = files.map(file => collectFile(options, path, file));
  const models = await Promise.all(promises);
  return mergeModels(models.filter(model => model));
}


async function collectFile(options: Options, path: string, file: string): Promise<Model> {
  if (await isDirectory(combinePath(path, file))) {
    return await parseFiles(options, combinePath(path, file));
  }

  if (options.generateRootIn === path) {
    const rootFile = changeCase.paramCase(options.rootStateName);
    const filename = trimExtension(file);
    if (filename === rootFile + constants.state ||
      filename === rootFile + constants.reduction) {
      return null;
    }
  }

  if (file.endsWith(constants.stateExt)) {
    const fileInfo = await collectFileInfo(options, path, file);
    const states = collectState(options, fileInfo);
    return { reductions: [], states };
  }

  if (file.endsWith(constants.reductionExt)) {
    const fileInfo = await collectFileInfo(options, path, file);
    const reductions = collectReduction(options, fileInfo);
    return { reductions, states: [] };
  }

  return null;
}
