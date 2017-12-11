import { Model, ActionsFile, ReducerFile, DispatcherFile } from './model';
import { Model as InputModel, Reduction, State } from '../parse/model';
import { Options } from '../Options';
import * as _ from 'lodash';
import { createActionFile } from './createActionsFile';
import { createReducerFile } from './createReducerFile';
import { createDispatcherFile } from './createDispatcherFile';
import { lookup } from 'maptools';
import { createTree, Tree } from './tree';
import { createRootState, populateTraceToRoot } from './tree';
import { createRootStateFile } from './createRootState';

export function deriveModel(options: Options, input: InputModel): Model {
  let tree = createTree(options, input.states);
  let states = input.states;
  if (options.generateRootIn) {
    tree = createRootState(tree, options.generateRootIn, options.rootStateName);
    states = [...states, tree.rootState];
  }

  tree = {
    ...populateTraceToRoot(tree),
    reductionMap: lookup(input.reductions, red => red.stateId)
  };

  return createDerivedModel(states, tree);
}

function createDerivedModel(states: State[], tree: Tree): Model {
  const actionFiles = states.map(state => createActionFile(state, tree));
  const reducerFiles = states.map(state => createReducerFile(state, tree));
  const dispatcherFiles = states.map(state => createDispatcherFile(state, tree));
  const rootStateFile = tree.rootState && createRootStateFile(tree);
  return {
    actionFiles,
    reducerFiles,
    dispatcherFiles,
    rootState: rootStateFile
  };
}
