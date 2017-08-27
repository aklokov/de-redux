import { Model } from './model';
import { Model as InputModel, Reduction } from '../parse/model';
import { Options } from '../Options';
import * as _ from 'lodash';
import { createActionFile } from './createActionsFile';
import { createReducerFile } from './createReducerFile';
import { toStringLookup, ds } from 'hash-map';
import { createTree } from './tree';
import { createRootState, populateTraceToRoot } from './tree';

export function deriveModel(options: Options, input: InputModel): Model {
  let tree = createTree(options, input.states);
  let states = input.states;
  if (options.generateRootIn) {
    tree = createRootState(tree, options.generateRootIn, options.rootStateName);
    states = [...states, tree.rootState];
  }

  tree = populateTraceToRoot(tree);

  const reductionMap = toStringLookup(input.reductions, red => red.stateId, ds);

  const actionFiles = states.map(state => createActionFile(state, reductionMap[state.id]));
  const reducerFiles = states.map(state => createReducerFile(state, reductionMap[state.id], tree));
  return {
    actionFiles,
    reducerFiles,
    dispatcherFiles: []
  };
}
