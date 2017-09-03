import { ReducerAction } from '../model';
import { State, Reduction, Field, Type } from '../../parse/model';
import { Tree } from '../tree';
import { createActionName } from '..';

export function createReducerAction(reduction: Reduction): ReducerAction {
  const actionName = createActionName(reduction);
  const fields = ['prev', ...reduction.parameters.slice(1).map(parm => `a.${parm.name}`)];
  const reductionLine = `${reduction.name}(${fields.join(', ')})`;
  return {
    constantName: actionName.constantName,
    name: actionName.actionName,
    reductionLine
  };
}
