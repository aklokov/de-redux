import { DispatcherFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, NodeChild } from '../tree';
import { createFilePath, isInit } from '..';
import { constants } from '../../constants';
import { createImports } from '.';
import { trimFilename } from '../../tools';

export function createDispatcherFile(state: State, reductions: Reduction[], actionsFile: ActionsFile, tree: Tree): DispatcherFile {
  const dispatcherFile = createFilePath(state.folder, state.name, constants.dispatcherFile);
  if (!reductions.length) {
    return createUnlink(dispatcherFile);
  }

  const node = tree.nodesById[state.id];
  const rootNode = tree.nodesById[node.rootId];
  const canSubscribe = node.parentIds.length < 2;
  return {
    dispatcherFile,
    unlink: false,
    canSubscribe,
    stateName: state.name,
    rootStateName: canSubscribe ? rootNode.state.name : null,
    traceToRoot: canSubscribe ? createTrace(node.traceToRoot) : null,
    imports: [],
    actions: []
  };
}

function createTrace(trace: string[]): string {
  const join = trace.join('.');
  return join.length ? '.' + join : '';
}

function createUnlink(file: string): DispatcherFile {
  return {
    dispatcherFile: file,
    unlink: true,
    canSubscribe: false,
    stateName: null,
    rootStateName: null,
    traceToRoot: null,
    imports: null,
    actions: null
  };
}
