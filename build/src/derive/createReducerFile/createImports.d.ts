import { State, Reduction } from '../../parse/model';
import { Import } from '../model';
import { ChildReducer } from '../model';
export declare function createImports(path: string, reductions: Reduction[], state: State): Import[];
export declare function createImportsWithAction(path: string, reductions: Reduction[], state: State): Import[];
export declare function createChildReducerImports(path: string, children: ChildReducer[]): Import[];
