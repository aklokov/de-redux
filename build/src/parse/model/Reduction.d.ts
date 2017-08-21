import { Field } from '.';
export interface Reduction {
    name: string;
    path: string;
    stateId: string;
    parameters: Field[];
}
