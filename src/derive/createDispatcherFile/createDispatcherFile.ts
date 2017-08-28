import { DispatcherFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, TreeNode, NodeChild } from '../tree';
import { createFilePath, isInit } from '..';
import { constants } from '../../constants';
import { createImports, createFullImports, createDispatcherAction } from '.';
import { trimFilename } from '../../tools';
import { needDispatcherFile } from '..';


export function createDispatcherFile(state: State, actionsFile: ActionsFile, tree: Tree): DispatcherFile {
  const dispatcherFile = createFilePath(state.folder, state.name, constants.dispatcherFile);
  if (!needDispatcherFile(state.id, tree)) {
    return createUnlink(dispatcherFile);
  }

  const reductions = tree.reductionMap[state.id] || [];
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
    const imports = createFullImports(path, actionsFile.actionsFile, reductions, state, root.state);
    const actions = reductions.filter(r => !isInit(r)).map(red => createDispatcherAction(red));
    return {
      dispatcherFile,
      unlink: false,
      canSubscribe,
      stateName: state.name,
      rootStateName: root.state.name,
      traceToRoot: createTrace(node.traceToRoot),
      imports,
      actions
    };
  }

  function createUnsubscribable(): DispatcherFile {
    const imports = createImports(path, actionsFile.actionsFile, reductions, state);
    const actions = reductions.map(red => createDispatcherAction(red));
    return {
      dispatcherFile,
      unlink: false,
      canSubscribe,
      stateName: state.name,
      rootStateName: null,
      traceToRoot: null,
      imports,
      actions
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
