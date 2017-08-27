import { ActionsFile, Action } from '../model';
import { State, Reduction } from '../../parse/model';
import { createFilePath, isInit, createActionName } from '..';
import { createFieldImports } from '..';
import { constants } from '../../constants';
import { trimFilename } from '../../tools';
import * as _ from 'lodash';

export function createActionFile(state: State, reductions: Reduction[]): ActionsFile {
  const actionsFile = createFilePath(state.folder, state.name, constants.actionsFile);
  if (!reductions.length) {
    return {
      actionsFile,
      unlink: true,
      actions: [],
      imports: []
    };
  }
  const path = trimFilename(actionsFile);
  return {
    actionsFile,
    unlink: false,
    actions: reductions.filter(red => !isInit(red)).map(reduction => createAction(state.name, reduction)),
    imports: createFieldImports(path, _.flatten(reductions.map(red => red.parameters.slice(1))))
  };
}

function createAction(stateName: string, reduction: Reduction): Action {
  const fields = reduction.parameters.slice(1).map(parm => `public ${parm.name}: ${parm.typename}`);
  const parameters = fields.join(', ');
  const actionName = createActionName(reduction);
  return {
    constantName: actionName.constantName,
    constantContent: `[${stateName}] - ${reduction.name}`,
    name: actionName.actionName,
    parameters,
    noConstructor: !parameters.length
  };
}
