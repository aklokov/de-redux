import { Tree, TreeNode, NodeChild, mapTree } from '.';
import { stringMap, StringMap } from 'hash-map';
import * as _ from 'lodash';

export function populateTraceToRoot(tree: Tree): Tree {
  return mapTree(populateTraceForNodes(tree), tree.rootState);
}

function populateTraceForNodes(tree: Tree): TreeNode[] {
  let toProcessChildren = tree.nodes.filter(node => node.isRoot);
  const nodesMap = stringMap<TreeNode>();
  const processed: TreeNode[] = [...toProcessChildren];
  while (toProcessChildren.length) {
    const node = toProcessChildren.shift();
    node.children.forEach(child => {
      const processedNode = nodesMap[child.childStateId];
      if (processedNode) {
        processedNode.noSubscribe = true;
        processedNode.traceToRoot = [];
        return;
      }

      const childNode = {
        ...tree.nodesById[child.childStateId],
        traceToRoot: [...(node.traceToRoot || []), child.fieldName]
      };
      nodesMap[child.childStateId] = childNode;
      processed.push(childNode);
      toProcessChildren.push(childNode);
    });
  }
  return processed;
}

