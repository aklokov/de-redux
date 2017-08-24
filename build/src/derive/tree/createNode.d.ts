import { State } from '../../parse/model';
import { TreeNode } from '.';
import { StringMap } from 'hash-map';
export declare function createNode(state: State, statesById: StringMap<State>): TreeNode;
