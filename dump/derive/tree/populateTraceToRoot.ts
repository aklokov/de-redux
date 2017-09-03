import { Tree, TreeNode, NodeChild, mapTree, isRoot } from '.';
import { stringMap, StringMap } from 'hash-map';
import * as _ from 'lodash';

export function populateTraceToRoot(tree: Tree): Tree {
  return mapTree(populateTraceForNodes(tree), tree.rootState);
}

function populateTraceForNodes(tree: Tree): TreeNode[] {
  const processed = stringMap<TreeNode>();
  return tree.nodes.map(node => populateTraceForNode(node, tree.nodesById, processed));
}

function populateTraceForNode(node: TreeNode, byId: StringMap<TreeNode>, processed: StringMap<TreeNode>): TreeNode {
  if (node.parentIds.length !== 1) {
    return node;
  }

  const processedNode = processed[node.state.id];
  if (processedNode) {
    return processedNode;
  }

  const parentNode = populateTraceForNode(byId[node.parentIds[0]], byId, processed);
  if (!parentNode.rootId) {
    return processed[node.state.id] = node;
  }

  const child = parentNode.children.find(ch => ch.childStateId === node.state.id);
  const result: TreeNode = {
    ...node,
    traceToRoot: [...parentNode.traceToRoot, child.fieldName],
    rootId: parentNode.rootId
  };
  return processed[node.state.id] = result;
}

