import { ReducerFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree } from '../tree';
import { createFilePath, isInit } from '..';
import { constants } from '../../constants';

export function createReducerFile(state: State, reductions: Reduction[], tree: Tree): ReducerFile {
  const reducerFile = createFilePath(state.folder, state.name, constants.reducerFile);
  const node = tree.nodesById[state.id];
  if (!reductions.length && !node.children.length) {
    return {
      reducerFile,
      unlink: true,
      stateName: state.name,
      imports: [],
      actions: []
    };

  }

  return {
    reducerFile:
    imports: [],

  };
}
