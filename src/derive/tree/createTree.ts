import { State, Field } from '../../parse/model';
import { Tree, TreeNode, NodeChild } from '.';
import { toStringMap } from 'hash-map';
import { createNode, populateParentIds, populateTraceToRoot, mapTree } from '.';
import { Options } from '../../Options';

export function createTree(options: Options, states: State[]): Tree {
  const statesById = toStringMap(states, 'id');
  const tree = mapTree(states.map(state => createNode(state, statesById)));
  return populateParentIds(tree);
}
