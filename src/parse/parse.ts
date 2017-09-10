import { Model, State, Reduction } from './model';
import { Options } from '../Options';
import { collectFiles, FileInfo } from './collectFiles';
import { filterStates, prepareFile, PreparedFile } from '.';
import { parseStateFile } from './parseState';
import { parseReductionFile } from './parseReduction';
import * as _ from 'lodash';

export async function parseFiles(options: Options, path: string | string[]): Promise<Model> {
  const filesModel = await collectFiles(path);
  const statePromises = filterStates(options, filesModel.states)
    .map(file => prepareFile(options, file).then(parseStateFile));
  const reductionPromises = filesModel.reductions
    .map(file => prepareFile(options, file).then(parseReductionFile));

  const [states, reductions] = await Promise.all([Promise.all(statePromises), Promise.all(reductionPromises)]);

  return {
    states: _.flatten(states),
    reductions: _.flatten(reductions)
  };
}
