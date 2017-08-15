import { Model } from '../model';
import * as fs from 'fs';
import { combinePath, isDirectory, readDir, mergeModels } from '.';
import { collectState, collectReduction } from './collectRedux';
import { Options } from '../Options';
const state = '.state.ts';
const reduction = '.reduction.ts';

export async function collectModel(options: Options, path: string): Promise<Model> {
  const files = await readDir(path);
  const promises = files.map(file => collectFile(options, path, file)).filter(promise => promise);
  const models = await Promise.all(promises);
  return mergeModels(models);
}

function collectFile(options: Options, path: string, file: string): Promise<Model> {
  if (isDirectory(path, file)) {
    return collectModel(options, combinePath(path, file));
  }

  if (file.endsWith(state)) {
    return collectState(options, path, file)
      .then(states => ({ reductions: [], states }));
  }

  if (file.endsWith(reduction)) {
    return collectReduction(options, path, file)
      .then(reductions => ({ reductions, states: [] }));
  }

  return null;
}
