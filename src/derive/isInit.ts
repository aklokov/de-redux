import { Reduction } from '../parse/model';

export function isInit(reduction: Reduction): boolean {
  return !reduction.parameters.length;
}
