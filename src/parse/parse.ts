import { Model } from './model';
import * as fs from 'fs';
import { combinePath, isDirectory, mergeModels } from '.';
import { readDir } from '../tools';
import { collectState, collectReduction } from './collectRedux';
import { Options } from '../Options';
import { constants } from '../constants';

export async function parseFiles(options: Options, path: string): Promise<Model> {
  const files = await readDir(path);
  const promises = files.map(file => collectFile(options, path, file)).filter(promise => promise);
  const models = await Promise.all(promises);
  return mergeModels(models);
}

function collectFile(options: Options, path: string, file: string): Promise<Model> {
  if (isDirectory(path, file)) {
    return parseFiles(options, combinePath(path, file));
  }

  if (file.endsWith(constants.stateExt)) {
    return collectState(options, path, file)
      .then(states => ({ reductions: [], states }));
  }

  if (file.endsWith(constants.reductionExt)) {
    return collectReduction(options, path, file)
      .then(reductions => ({ reductions, states: [] }));
  }

  return null;
}
