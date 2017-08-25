import { State, Field } from '../../parse/model';
import { TreeNode, NodeChild } from '.';
import { toStringMap, StringMap } from 'hash-map';

export function createRootNode(state: State, rootNodes: TreeNode[]): TreeNode {
  const nodesById = toStringMap(rootNodes, node => node.state.id);
  return {
    state,
    children: state.fields.map(field => createNodeChild(field, nodesById)).filter(s => s),
    isRoot: true,
    traceToRoot: null,
    noSubscribe: false
  };
}

function createNodeChild(field: Field, nodesById: StringMap<TreeNode>): NodeChild {
  const node = nodesById[field.imported[0].id];
  return {
    childStateId: node.state.id,
    fieldName: field.name
  };
}
