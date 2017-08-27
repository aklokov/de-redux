import { DispatcherFile, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree } from '../tree';
export declare function createDispatcherFile(state: State, reductions: Reduction[], actionsFile: ActionsFile, tree: Tree): DispatcherFile;
