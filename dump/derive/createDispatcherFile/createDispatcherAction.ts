import { DispatcherAction } from '../model';
import { State, Reduction, Field, Type } from '../../parse/model';
import { Tree } from '../tree';
import { createActionName } from '..';

export function createDispatcherAction(reduction: Reduction): DispatcherAction {
  const actionName = createActionName(reduction);
  const params = reduction.parameters.slice(1);
  const parameters = params.map(parm => parm.name).join(', ');
  const fullParameters = params.map(parm => `${parm.name}: ${parm.typename}`).join(', ');
  return {
    name: reduction.name,
    actionName: actionName.actionName,
    parameters,
    fullParameters
  };
}
