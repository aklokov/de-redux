import { Model } from '../../model';
import * as fs from 'fs';
import { isFolder, combinePath } from '..';
import { endsWith } from '../../tools';
import { collectReduction, collectState } from '.';
import { readDir, mergeModels } from '..';
import { Options } from '../../Options';
const state = '.state.ts';
const reduction = '.reduction.ts';

export async function collectRedux(options: Options, path: string): Promise<Model> {
  const allFiles = await readDir(path);
  const files = allFiles.filter(file => !isFolder(file, path));

  const statePromises = files
    .filter(file => endsWith(file, state))
    .map(file => collectState(options, path, file));
  const reductionPromises = files
    .filter(file => endsWith(file, reduction))
    .map(file => collectReduction(options, path, file));
  const models = await Promise.all([...statePromises, ...reductionPromises]);
  return mergeModels(models);
}
