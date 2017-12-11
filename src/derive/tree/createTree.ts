import { State, Field } from '../../parse/model';
import { Tree, TreeNode, NodeChild } from '.';
import { map } from 'maptools';
import { createNode, populateParentIds, mapTree } from '.';
import { Options } from '../../Options';

export function createTree(options: Options, states: State[]): Tree {
  const statesById = map(states, state => state.id);
  const tree = mapTree(states.map(state => createNode(state, statesById)));
  return populateParentIds(tree);
}
