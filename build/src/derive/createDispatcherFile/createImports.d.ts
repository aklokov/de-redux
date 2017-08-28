import { State, Reduction } from '../../parse/model';
import { Import } from '../model';
export declare function createImports(path: string, actions: string, reductions: Reduction[], state: State): Import[];
export declare function createFullImports(path: string, actions: string, reductions: Reduction[], state: State, rootState: State): Import[];
