import { Type } from './';

export interface ChildState {
    stateId: string;
    fieldName: string;
}

export interface State extends Type {
    childStates: ChildState[];
}
