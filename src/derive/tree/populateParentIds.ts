import { Tree, TreeNode, NodeChild, mapTree } from '.';
import { lookup } from '@vlr/map-tools';
import * as _ from 'lodash';

export function populateParentIds(tree: Tree): Tree {
  return mapTree(populateNodesParentIds(tree.nodes));
}

interface ParentChild {
  parentId: string;
  childId: string;
}

function populateNodesParentIds(nodes: TreeNode[]): TreeNode[] {
  const pairs = _.flatten(nodes.map(getPairs));
  const pairsLookup = lookup(pairs, pair => pair.childId, pair => pair.parentId);
  return nodes.map(node => ({
    ...node,
    parentIds: pairsLookup.get(node.state.id) || []
  }));
}

function getPairs(node: TreeNode): ParentChild[] {
  return node.children.map(child => ({ parentId: node.state.id, childId: child.childStateId }));
}
