import { ReducerFile, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree } from '../tree';
export declare function createReducerFile(state: State, reductions: Reduction[], actionsFile: ActionsFile, tree: Tree): ReducerFile;
