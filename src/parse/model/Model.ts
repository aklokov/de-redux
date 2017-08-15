import { State, Reduction, Type } from './';

export interface Model {
    states: State[];
    reductions: Reduction[];
}
