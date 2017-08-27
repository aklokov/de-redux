import { ReducerAction } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree } from '../tree';
export declare function createReducerAction(reduction: Reduction, state: State, tree: Tree): ReducerAction;
