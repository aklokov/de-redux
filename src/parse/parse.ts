import { Model, State, Reduction } from './model';
import { Options } from '../Options';
import { collectFiles, FileInfo } from './collectFiles';
import { getStates, getReductions, prepareFile, PreparedFile } from '.';
import { parseStateFile } from './parseState';
import { parseReductionFile } from './parseReduction';
import * as _ from 'lodash';

export async function parseFiles(options: Options, path: string | string[]): Promise<Model> {
  const files = await collectFiles(path);
  const statePromises = getStates(options, files)
    .map(file => prepareFile(options, file).then(parseStateFile));
  const reductionPromises = getReductions(files)
    .map(file => prepareFile(options, file).then(parseReductionFile));

  const [states, reductions] = await Promise.all([Promise.all(statePromises), Promise.all(reductionPromises)]);

  return {
    states: _.flatten(states),
    reductions: _.flatten(reductions)
  };
}


