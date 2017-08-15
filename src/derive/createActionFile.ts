import { ActionsFile, Action } from './model';
import { State, Reduction } from '../parse/model';
import { createFilePath, createImports, isInit } from '.';
import { constants } from '../constants';
import * as _ from 'lodash';
import * as changeCase from 'change-case';

export function createActionFile(state: State, reductions: Reduction[]): ActionsFile {
  const filePath = createFilePath(state.path, state.name, constants.actionsFile);
  return {
    actionsFile: filePath,
    actions: reductions.filter(red => !isInit(red)).map(reduction => createAction(state.name, reduction)),
    imports: createImports(filePath, _.flatten(reductions.map(red => red.parameters)))
  };
}

function createAction(stateName: string, reduction: Reduction): Action {
  return {
    constantName: changeCase.constantCase(reduction.name),
    constantContent: `[${stateName}] - ${reduction.name}`,
    name: reduction.name + 'Action',
    parameters: reduction.parameters
  };
}
