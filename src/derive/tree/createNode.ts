import { State, Field } from '../../parse/model';
import { TreeNode, NodeChild } from '.';

export function createNode(state: State, statesById: Map<string, State>): TreeNode {
  return {
    state,
    children: state.fields.map(field => createNodeChild(field, statesById)).filter(s => s),
    traceToRoot: null,
    parentIds: null,
    rootId: null
  };
}

function createNodeChild(field: Field, statesById: Map<string, State>): NodeChild {
  if (field.imported.length !== 1 || field.imported[0].name !== field.typename) {
    return null;
  }

  const state = statesById.get(field.imported[0].id);
  if (!state) {
    return null;
  }

  return {
    childStateId: state.id,
    fieldName: field.name
  };
}
