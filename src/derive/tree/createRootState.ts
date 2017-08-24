import { State, Field } from '../../parse/model';
import { Tree, TreeNode } from '.';
import { stringMap, StringMap } from 'hash-map';
import * as changeCase from 'change-case';
import { constants } from '../../constants';
import { combinePath } from '../../tools';
import { mapTree, createFields, createRootNode } from '.';

export function createRootState(tree: Tree, path: string, name: string = constants.defaultRootStateName): Tree {
  const rootNodes = tree.nodes.filter(node => node.isRoot);
  const restOfNodes = tree.nodes.filter(node => !node.isRoot);
  const state = createState(name, path, rootNodes);
  const rootNode = createRootNode(state, rootNodes);
  const nodes = [rootNode, ...rootNodes.map(node => fixNode(node, rootNode)), ...restOfNodes];
  return mapTree(nodes, state);
}

function fixNode(node: TreeNode, rootNode: TreeNode): TreeNode {
  const fieldName = rootNode.children.find(child => child.childStateId === node.state.id).fieldName;
  return {
    ...node,
    parentId: rootNode.state.id,
    parentFieldName: fieldName,
    isRoot: false
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
