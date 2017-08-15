import { Field, Type } from '.';

export interface Reduction {
  name: string;
  path: string;
  stateId: string;
  parameters: Field[];
}
