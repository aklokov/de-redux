import { ReducerFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, NodeChild } from '../tree';
import { createFilePath, isInit } from '..';
import { constants } from '../../constants';
import { createImports, createChildReducerImports, createReducerAction } from '.';
import { trimFilename } from '../../tools';

export function createReducerFile(state: State, reductions: Reduction[], actionsFile: ActionsFile, tree: Tree): ReducerFile {
  const reducerFile = createReducerFileName(state);
  const node = tree.nodesById[state.id];
  if (!reductions.length && !node.children.length) {
    return createUnlink(reducerFile);
  }

  const path = trimFilename(reducerFile);
  const childReducers = node.children.map(child => createChildReducer(child, tree));
  const imports = createImports(path, actionsFile.actionsFile, reductions, state);
  const childImports = createChildReducerImports(path, childReducers);
  return {
    reducerFile,
    unlink: false,
    stateName: state.name,
    imports: [...imports, ...childImports],
    actions: reductions.filter(r => !isInit(r)).map(r => createReducerAction(r)),
    childReducers
  };
}

function createUnlink(file: string): ReducerFile {
  return {
    reducerFile: file,
    unlink: true,
    stateName: null,
    imports: null,
    actions: null,
    childReducers: null
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
