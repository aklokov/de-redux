import { Tree, TreeNode, NodeChild, mapTree } from '.';

export function populateIsRoot(tree: Tree): Tree {
  return mapTree(tree.nodes.map(node => populateNodeIsRoot(node, tree)));
}

function populateNodeIsRoot(node: TreeNode, tree: Tree): TreeNode {
  const parents = tree.nodes.filter(parent => getLinks(parent, node).length > 0);
  return parents.length ? node : rootNode(node);
}

function getLinks(parent: TreeNode, node: TreeNode): NodeChild[] {
  return parent.children.filter(child => child.childStateId === node.state.id);
}

function rootNode(node: TreeNode): TreeNode {
  return {
    ...node,
    isRoot: true
  };
}
