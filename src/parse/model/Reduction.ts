import { Field, Type } from '.';

export interface Reduction extends Type {
  stateId: string;
  parameters: Field[];
}
