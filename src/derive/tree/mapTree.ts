import { Tree, TreeNode, NodeChild } from '.';
import { toStringMap, StringMap } from 'hash-map';

export function mapTree(nodes: TreeNode[]): Tree {
  return {
    nodes,
    nodesById: toStringMap(nodes, node => node.state.id)
  };
}
