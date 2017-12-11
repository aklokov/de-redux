import { Field } from '../../parse/model';
import { TreeNode } from '.';
import * as changeCase from 'change-case';

export function createFields(rootNodes: TreeNode[]): Field[] {
  const namesMap = new Map<string, boolean>();
  const fields: Field[] = [];
  rootNodes.forEach(node => {
    const name = createName(node.state.name, namesMap);
    fields.push({
      name,
      typename: node.state.name,
      imported: [node.state]
    });
  });
  return fields;
}

function createName(typeName: string, names: Map<string, boolean>): string {
  let name = changeCase.camelCase(typeName);
  let i = 1;
  while (names.has(name)) {
    name = name + (i++);
  }

  names.set(name, true);
  return name;
}
