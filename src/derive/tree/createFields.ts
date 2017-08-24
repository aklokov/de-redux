import { Field } from '../../parse/model';
import { TreeNode } from '.';
import { stringMap, StringMap } from 'hash-map';
import * as changeCase from 'change-case';


export function createFields(rootNodes: TreeNode[]): Field[] {
  const namesMap = stringMap<boolean>();
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

function createName(typeName: string, names: StringMap<boolean>): string {
  let name = changeCase.camelCase(typeName);
  let i = 1;
  while (names[name]) {
    name = name + (i++);
  }

  names[name] = true;
  return name;
}
