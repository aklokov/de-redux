import { State, Field } from '../../parse/model';
import { TreeNode, NodeChild } from '.';
import { map } from 'maptools';

export function createRootNode(state: State, rootNodes: TreeNode[]): TreeNode {
  const nodesById = map(rootNodes, node => node.state.id);
  return {
    state,
    children: state.fields.map(field => createNodeChild(field, nodesById)).filter(s => s),
    traceToRoot: [],
    parentIds: [],
    rootId: state.id
  };
}

function createNodeChild(field: Field, nodesById: Map<string, TreeNode>): NodeChild {
  const node = nodesById.get(field.imported[0].id);
  return {
    childStateId: node.state.id,
    fieldName: field.name
  };
}
