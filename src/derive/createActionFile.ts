import { ActionsFile, Action } from './model';
import { State, Reduction } from '../parse/model';
import { createFilePath, createImports, isInit } from '.';
import { constants } from '../constants';
import * as _ from 'lodash';
import * as changeCase from 'change-case';

export function createActionFile(state: State, reductions: Reduction[]): ActionsFile {
  const actionsFile = createFilePath(state.folder, state.name, constants.actionsFile);
  if (!reductions) {
    return {
      actionsFile,
      unlink: true,
      actions: [],
      imports: []
    };
  }

  return {
    actionsFile,
    unlink: false,
    actions: reductions.filter(red => !isInit(red)).map(reduction => createAction(state.name, reduction)),
    imports: createImports(actionsFile, _.flatten(reductions.map(red => red.parameters.slice(1))))
  };
}

function createAction(stateName: string, reduction: Reduction): Action {
  const fields = reduction.parameters.slice(1).map(parm => `public ${parm.name}: ${parm.typename}`);
  const parameters = fields.join(', ');
  return {
    constantName: changeCase.constantCase(reduction.name),
    constantContent: `[${stateName}] - ${reduction.name}`,
    name: changeCase.pascalCase(reduction.name) + 'Action',
    parameters,
    noConstructor: !parameters.length
  };
}