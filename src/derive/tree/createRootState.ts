import { State, Field } from '../../parse/model';
import { Tree, TreeNode } from '.';
import * as changeCase from 'change-case';
import { constants } from '../../constants';
import { combinePath } from '../../tools';
import { mapTree, createFields, createRootNode, isRoot } from '.';

export function createRootState(tree: Tree, path: string, name: string): Tree {
  const rootNodes = tree.nodes.filter(isRoot);
  const restOfNodes = tree.nodes.filter(node => !isRoot(node));
  const state = createState(name, path, rootNodes);
  const rootNode = createRootNode(state, rootNodes);
  const nodes = [rootNode, ...rootNodes.map(node => fixNode(node, rootNode)), ...restOfNodes];
  return mapTree(nodes, state);
}

function fixNode(node: TreeNode, rootNode: TreeNode): TreeNode {
  return {
    ...node,
    parentIds: [rootNode.state.id]
  };
}

function createState(name: string, path: string, rootNodes: TreeNode[]): State {
  const stateFile = changeCase.paramCase(name) + constants.state;
  const statePath = combinePath(path, stateFile);
  const id = combinePath(statePath, name);
  return {
    id,
    name,
    folder: path,
    path: statePath,
    fields: createFields(rootNodes)
  };
}
