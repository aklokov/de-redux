import { State, Reduction, Field, Type } from '../../parse/model';
import { createActionsImport, createTypeImports, createReductionImports } from '..';
import { Import } from '../model';
import * as _ from 'lodash';

export function createImports(path: string, actions: string, reductions: Reduction[], state: State): Import[] {
  const actionsImport = createActionsImport(path, actions);
  const fieldImports = createReductionImports(path, reductions);
  return [actionsImport, ...fieldImports,  ...createTypeImports(path, [state])];
}

export function createFullImports(path: string, actions: string, reductions: Reduction[], state: State, rootState: State): Import[] {
  return [...createImports(path, actions, reductions, state), ...createTypeImports(path, [rootState])];
}
