import { State, Reduction, Field, Type } from '../../parse/model';
import { Tree } from '../tree';
import { Import } from '../model';
import * as _ from 'lodash';
import { createRelativePath, createRelativePathToFile } from '..';
import { createFieldImports, createTypeImports, createActionsImport } from '..';
import { trimFilename } from '../../tools';
import { ActionsFile, ChildReducer } from '../model';

const stringMap: Import = {
  importLine: '{ stringMap }',
  path: 'hash-map'
};

export function createImports(path: string, actions: string, reductions: Reduction[], state: State): Import[] {
  const actionsImport = createActionsImport(path, actions);
  const fieldImports = createFieldImports(path, _.flatten(reductions.map(red => red.parameters)));
  const reductionImports = createTypeImports(path, reductions);
  return [actionsImport, stringMap, ...fieldImports, ...reductionImports];
}

function createReductionImport(path: string, reduction: Reduction): Import {
  return {
    importLine: `{ ${reduction.name} }`,
    path: createRelativePath(reduction.path, path)
  };
}

export function createChildReducerImports(path: string, children: ChildReducer[]): Import[] {
  return children.map(child => ({
    importLine: `{ reducer as ${child.fieldName}Reducer, allActions as ${child.fieldName}Actions }`,
    path: createRelativePathToFile(child.path, path)
  }));
}
