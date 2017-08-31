import { State } from '../parse/model';
import * as changeCase from 'change-case';
import { constants } from '../constants';

function createFilePath(path: string, name: string, suffix: string): string {
  const kebabName = changeCase.paramCase(name);
  return `${path}/gen/${kebabName}${suffix}.ts`;
}

export function createActionFileName(state: State): string {
  return createFilePath(state.folder, state.name, constants.actionsFile);
}

export function createReducerFileName(state: State): string {
  return createFilePath(state.folder, state.name, constants.reducerFile);
}

export function createDispatcherFileName(state: State): string {
  return createFilePath(state.folder, state.name, constants.dispatcherFile);
}
