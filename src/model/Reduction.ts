import { Field } from '.';

export interface Reduction {
  name: string;
  stateId: string;
  parameters: Field[];
}
