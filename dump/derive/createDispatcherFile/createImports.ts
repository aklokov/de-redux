import { State, Reduction, Field, Type } from '../../parse/model';
import { createActionsImport, createTypeImports, createReductionImports, createActionFileName, needActionsFile, canSubscribe } from '..';
import { Import } from '../model';
import { Tree } from '../tree';
import * as _ from 'lodash';

export function createImports(path: string, state: State, tree: Tree): Import[] {
  const reductions = tree.reductionMap[state.id] || [];
  let imports = [...createReductionImports(path, reductions), ...createTypeImports(path, [state])];
  if (needActionsFile(state.id, tree)) {
    imports.push(createActionsImport(path, createActionFileName(state)));
  }

  if (canSubscribe(state.id, tree)) {
    const node = tree.nodesById[state.id];
    if (node.rootId !== state.id) {
      imports = [...imports, ...createTypeImports(path, [tree.nodesById[node.rootId].state])];
    }
  }

  return imports;
}
