import { State, Reduction } from '../../parse/model';
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
    nodesById: Map<string, TreeNode>;
    rootState?: State;
    reductionMap?: Map<string, Reduction[]>;
}
