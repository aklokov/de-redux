import { State, Reduction, Type } from './';
import { StringMap } from '../tools';

export interface Model {
    states: State[];
    reductions: Reduction[];
}
