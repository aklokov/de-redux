import { Model, ActionsFile, ReducerFile, DispatcherFile } from './model';
import { Model as InputModel, Reduction, State } from '../parse/model';
import { Options } from '../Options';
import * as _ from 'lodash';
import { createActionFile } from './createActionsFile';
import { createReducerFile } from './createReducerFile';
import { createDispatcherFile } from './createDispatcherFile';
import { toStringLookup, ds, StringMap } from 'hash-map';
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
    reductionMap: toStringLookup(input.reductions, red => red.stateId, ds)
  };

  return createDerivedModel(states, tree);
}

function createDerivedModel(states: State[], tree: Tree): Model {
  const actionFiles: ActionsFile[] = [];
  const reducerFiles: ReducerFile[] = [];
  const dispatcherFiles: DispatcherFile[] = [];
  states.forEach(state => {
    const actionFile = createActionFile(state, tree);
    actionFiles.push(actionFile);
    reducerFiles.push(createReducerFile(state, actionFile, tree));
    dispatcherFiles.push(createDispatcherFile(state, actionFile, tree));
  });

  const rootStateFile = tree.rootState && createRootStateFile(tree);

  return {
    actionFiles,
    reducerFiles,
    dispatcherFiles,
    rootState: rootStateFile
  };
}
