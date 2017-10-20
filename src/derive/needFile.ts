import { Tree } from './tree';

export function needActionsFile(id: string, tree: Tree): boolean {
  return !!tree.reductionMap[id];
}

export function needReducerFile(id: string, tree: Tree): boolean {
  return !!tree.reductionMap[id] || !!tree.nodesById[id].children.length;
}

export function needDispatcherFile(id: string, tree: Tree): boolean {
  return !!tree.reductionMap[id] || canSubscribe(id, tree);
}

export function canSubscribe(id: string, tree: Tree): boolean {
  return false;
  // const node = tree.nodesById[id];
  // return node.parentIds.length === 1;
}
