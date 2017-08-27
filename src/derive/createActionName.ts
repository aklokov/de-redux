import * as changeCase from 'change-case';
import { Reduction } from '../parse/model';

export interface IActionName {
  constantName: string;
  actionName: string;
}

export function createActionName(reduction: Reduction): IActionName {
  return {
    constantName: changeCase.constantCase(reduction.name),
    actionName: changeCase.pascalCase(reduction.name) + 'Action'
  };
}
