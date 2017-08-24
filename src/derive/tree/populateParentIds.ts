import { Tree, TreeNode, NodeChild, mapTree } from '.';

export function populateParentIds(tree: Tree): Tree {
  return mapTree(tree.nodes.map(node => populeteNodeParentIds(node, tree)));
}

function populeteNodeParentIds(node: TreeNode, tree: Tree): TreeNode {
  const parents = tree.nodes.filter(parent => getLinks(parent, node).length > 0);
  if (parents.length === 0) {
    return rootNode(node);
  }

  const parent = parents[0];
  const links = getLinks(parent, node);
  if (parents.length > 1 || links.length > 1) {
    return node;
  }

  return childNode(node, parent.state.id, links[0].fieldName);
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

function childNode(node: TreeNode, parentId: string, fieldName: string): TreeNode {
  return {
    ...node,
    parentId,
    parentFieldName: fieldName
  };
}

