import { Tree, TreeNode, mapTree } from '.';

export function populateTraceToRoot(tree: Tree): Tree {
  return mapTree(tree.nodes.map(node => populateNodeTraceToRoot(node, tree)), tree.rootState);
}

function populateNodeTraceToRoot(node: TreeNode, tree: Tree): TreeNode {
  if (!node.parentId) {
    return node;
  }

  const traceToRoot = getTrace(node.state.id, node, tree, []);
  return {
    ...node,
    traceToRoot
  };
}

function getTrace(id: string, node: TreeNode, tree: Tree, currentTrace: string[]): string[] {
  if (node.parentId === id) {
    return null;
  }

  if (node.parentId === null) {
    return currentTrace;
  }

  const parentNode = tree.nodesById[node.parentId];
  return getTrace(id, parentNode, tree, [node.parentFieldName, ...currentTrace]);
}
