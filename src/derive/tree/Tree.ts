import { State } from '../../parse/model';
import { StringMap } from 'hash-map';

export interface NodeChild {
  childStateId: string;
  fieldName: string;
}

export interface TreeNode {
  state: State;
  children: NodeChild[];
  isRoot: boolean;
  traceToRoot: string[];
  noSubscribe: boolean;
}

export interface Tree {
  nodes: TreeNode[];
  nodesById: StringMap<TreeNode>;
  rootState?: State;
}
