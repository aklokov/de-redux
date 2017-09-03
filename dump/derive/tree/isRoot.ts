import { TreeNode } from '.';

export function isRoot(node: TreeNode): boolean {
  return !node.parentIds.length;
}
