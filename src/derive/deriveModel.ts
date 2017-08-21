import { Model } from './model';
import { Model as InputModel, Reduction } from '../parse/model';
import { Options } from '../Options';
import * as _ from 'lodash';
import { createActionFile, createReducerFile } from '.';
import { toStringLookup } from 'hash-map';
import { createTree } from './tree';

export function deriveModel(options: Options, input: InputModel): Model {
  const tree = createTree(input.states);
  const reductionMap = toStringLookup(input.reductions, red => red.stateId);
  const actionFiles = input.states.map(state => createActionFile(state, reductionMap[state.id]));
  const reducers = input.states.map(state => createReducerFile(state, reductionMap[state.id]));
  return {
    actionFiles,
    reducerFiles: [],
    dispatcherFiles: []
  };
}

