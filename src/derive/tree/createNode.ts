import { State, Field } from '../../parse/model';
import { TreeNode, NodeChild } from '.';
import { StringMap } from 'hash-map';

export function createNode(state: State, statesById: StringMap<State>): TreeNode {
  return {
    state,
    children: state.fields.map(field => createNodeChild(field, statesById)).filter(s => s),
    isRoot: false,
    parentId: null,
    parentFieldName: null,
    traceToRoot: null
  };
}

function createNodeChild(field: Field, statesById: StringMap<State>): NodeChild {
  if (field.imported.length !== 1 || field.imported[0].name !== field.typename) {
    return null;
  }

  const state = statesById[field.imported[0].id];
  if (!state) {
    return null;
  }

  return {
    childStateId: state.id,
    fieldName: field.name
  };
}
