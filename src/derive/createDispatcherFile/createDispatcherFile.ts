import { DispatcherFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, TreeNode, NodeChild } from '../tree';
import { createFilePath, isInit } from '..';
import { constants } from '../../constants';
import { createImports, createFullImports } from '.';
import { trimFilename } from '../../tools';

export function createDispatcherFile(state: State, reductions: Reduction[], actionsFile: ActionsFile, tree: Tree): DispatcherFile {
  const dispatcherFile = createFilePath(state.folder, state.name, constants.dispatcherFile);
  if (!reductions.length) {
    return createUnlink(dispatcherFile);
  }
  const path = trimFilename(dispatcherFile);
  const node = tree.nodesById[state.id];
  const canSubscribe = node.parentIds.length < 2;
  if (canSubscribe) {
    return createSubscribable();
  } else {
    return createUnsubscribable();
  }

  function createSubscribable(): DispatcherFile {
    const root = tree.nodesById[node.rootId];
    const imports = createFullImports(path, actionsFile.actionsFile, reductions, root.state);
    return {
      dispatcherFile,
      unlink: false,
      canSubscribe,
      stateName: state.name,
      rootStateName: root.state.name,
      traceToRoot: createTrace(node.traceToRoot),
      imports,
      actions: []
    };
  }

  function createUnsubscribable(): DispatcherFile {
    const imports = createImports(path, actionsFile.actionsFile, reductions);
    return {
      dispatcherFile,
      unlink: false,
      canSubscribe,
      stateName: state.name,
      rootStateName: null,
      traceToRoot: null,
      imports,
      actions: []
    };
  }
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
