import { ReducerFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, NodeChild } from '../tree';
import { createFilePath, isInit } from '..';
import { constants } from '../../constants';
import { createImports, createImportsWithAction, createChildReducerImports } from '.';
import { createReducerAction, createExportedActions, createInitFields } from '.';
import { trimFilename } from '../../tools';
import { needReducerFile, needActionsFile } from '..';


export function createReducerFile(state: State, actionsFile: ActionsFile, tree: Tree): ReducerFile {
  const reducerFile = createReducerFileName(state);
  const node = tree.nodesById[state.id];
  if (!needReducerFile(state.id, tree)) {
    return createUnlink(reducerFile);
  }

  const needActions = needActionsFile(state.id, tree);
  const reductions = tree.reductionMap[state.id] || [];
  const path = trimFilename(reducerFile);
  const childReducers = node.children
    .filter(child => needReducerFile(child.childStateId, tree))
    .map(child => createChildReducer(child, tree));
  const imports = needActions
    ? createImportsWithAction(path, actionsFile.actionsFile, reductions, state)
    : createImports(path, reductions, state);
  const childImports = createChildReducerImports(path, childReducers);
  const exportedActions = createExportedActions(childReducers, needActions);
  const needInit = !reductions.some(red => isInit(red));
  const initFields = needInit ? createInitFields(node, tree) : [];
  return {
    reducerFile,
    unlink: false,
    stateName: state.name,
    imports: [...imports, ...childImports],
    actions: reductions.filter(r => !isInit(r)).map(r => createReducerAction(r)),
    childReducers,
    exportedActions,
    initFields
  };
}

function createUnlink(file: string): ReducerFile {
  return {
    reducerFile: file,
    unlink: true,
    stateName: null,
    imports: null,
    actions: null,
    childReducers: null,
    exportedActions: null,
    initFields: null
  };
}

function createChildReducer(child: NodeChild, tree: Tree): ChildReducer {
  const childState = tree.nodesById[child.childStateId].state;
  return {
    fieldName: child.fieldName,
    path: createReducerFileName(childState)
  };
}

function createReducerFileName(state: State): string {
  return createFilePath(state.folder, state.name, constants.reducerFile);
}
