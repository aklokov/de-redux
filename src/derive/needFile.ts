import { Tree } from './tree';

export function needActionsFile(id: string, tree: Tree): boolean {
  return !!tree.reductionMap[id];
}

export function needReducerFile(id: string, tree: Tree): boolean {
  return !!tree.reductionMap[id] || !!tree.nodesById[id].children.length;
}

export function needDispatcherFile(id: string, tree: Tree): boolean {
  return !!tree.reductionMap[id];
}
