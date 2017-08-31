import { ActionsFile, Action } from '../model';
import { State, Reduction } from '../../parse/model';
import { createActionFileName, isInit, createActionName } from '..';
import { createReductionImports } from '..';
import { constants } from '../../constants';
import { trimFilename } from '../../tools';
import { Tree } from '../tree';
import { needActionsFile } from '..';
import * as _ from 'lodash';

export function createActionFile(state: State, tree: Tree): ActionsFile {
  const actionsFile = createActionFileName(state);
  if (!needActionsFile(state.id, tree)) {
    return createUnlink(actionsFile);
  }

  const reductions = tree.reductionMap[state.id];
  const path = trimFilename(actionsFile);
  return {
    actionsFile,
    unlink: false,
    actions: reductions.filter(red => !isInit(red)).map(reduction => createAction(state.name, reduction)),
    imports: createReductionImports(path, reductions)
  };
}

function createUnlink(file: string): ActionsFile {
  return {
    actionsFile: file,
    unlink: true,
    actions: null,
    imports: null
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
