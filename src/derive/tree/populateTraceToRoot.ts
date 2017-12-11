import { Tree, TreeNode, NodeChild, mapTree, isRoot } from '.';
import * as _ from 'lodash';

export function populateTraceToRoot(tree: Tree): Tree {
  return mapTree(populateTraceForNodes(tree), tree.rootState);
}

function populateTraceForNodes(tree: Tree): TreeNode[] {
  const processed = new Map<string, TreeNode>();
  return tree.nodes.map(node => populateTraceForNode(node, tree.nodesById, processed));
}

function populateTraceForNode(node: TreeNode, byId: Map<string, TreeNode>, processed: Map<string, TreeNode>): TreeNode {
  if (node.parentIds.length !== 1) {
    return node;
  }

  const processedNode = processed.get(node.state.id);
  if (processedNode) {
    return processedNode;
  }

  const parentNode = populateTraceForNode(byId.get(node.parentIds[0]), byId, processed);
  if (!parentNode.rootId) {
    processed.set(node.state.id, node);
    return node;
  }

  const child = parentNode.children.find(ch => ch.childStateId === node.state.id);
  const result: TreeNode = {
    ...node,
    traceToRoot: [...parentNode.traceToRoot, child.fieldName],
    rootId: parentNode.rootId
  };
  processed.set(node.state.id, result);
  return result;
}

