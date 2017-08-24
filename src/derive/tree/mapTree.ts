import { Tree, TreeNode, NodeChild } from '.';
import { toStringMap, StringMap } from 'hash-map';
import { State, Field } from '../../parse/model';

export function mapTree(nodes: TreeNode[], rootState?: State): Tree {
  return {
    nodes,
    nodesById: toStringMap(nodes, node => node.state.id),
    rootState
  };
}
