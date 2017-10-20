import { DispatcherFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, TreeNode, NodeChild } from '../tree';
import { createDispatcherFileName, isInit } from '..';
import { constants } from '../../constants';
import { createImports, createDispatcherAction } from '.';
import { trimFilename } from '../../tools';
import { needDispatcherFile, canSubscribe, needActionsFile } from '..';

export function createDispatcherFile(state: State, tree: Tree): DispatcherFile {
  const dispatcherFile = createDispatcherFileName(state);
  if (!needDispatcherFile(state.id, tree)) {
    return createUnlink(dispatcherFile);
  }

  const reductions = tree.reductionMap[state.id] || [];
  const path = trimFilename(dispatcherFile);
  if (canSubscribe(state.id, tree)) {
    return createSubscribable();
  } else {
    return createUnsubscribable();
  }

  function createSubscribable(): DispatcherFile {
    const node = tree.nodesById[state.id];
    const root = tree.nodesById[node.rootId];
    const imports = createImports(path, state, tree);
    const actions = reductions.filter(r => !isInit(r)).map(red => createDispatcherAction(red));
    return {
      dispatcherFile,
      unlink: false,
      canSubscribe: true,
      stateName: state.name,
      rootStateName: root.state.name,
      traceToRoot: createTrace(node.traceToRoot),
      imports,
      actions
    };
  }

  function createUnsubscribable(): DispatcherFile {
    const imports = createImports(path, state, tree);
    const actions = reductions.filter(r => !isInit(r)).map(red => createDispatcherAction(red));
    return {
      dispatcherFile,
      unlink: false,
      canSubscribe: false,
      stateName: state.name,
      rootStateName: null,
      traceToRoot: null,
      imports,
      actions
    };
  }
}


function createTrace(trace: string[]): string {
  return trace.join('.');
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
