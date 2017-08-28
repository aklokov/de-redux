import { State, Reduction } from '../../parse/model';
import { StringMap } from 'hash-map';
export interface NodeChild {
    childStateId: string;
    fieldName: string;
}
export interface TreeNode {
    state: State;
    children: NodeChild[];
    parentIds: string[];
    traceToRoot: string[];
    rootId: string;
}
export interface Tree {
    nodes: TreeNode[];
    nodesById: StringMap<TreeNode>;
    rootState?: State;
    reductionMap?: StringMap<Reduction[]>;
}
