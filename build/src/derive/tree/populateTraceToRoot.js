"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function populateTraceToRoot(tree) {
    return _1.mapTree(populateTraceForNodes(tree), tree.rootState);
}
exports.populateTraceToRoot = populateTraceToRoot;
function populateTraceForNodes(tree) {
    const processed = new Map();
    return tree.nodes.map(node => populateTraceForNode(node, tree.nodesById, processed));
}
function populateTraceForNode(node, byId, processed) {
    if (node.parentIds.length !== 1) {
        return node;
    }
    const processedNode = processed.get(node.state.id);
    if (processedNode) {
        return processedNode;
    }
    const parentNode = populateTraceForNode(byId.get(node.parentIds[0]), byId, processed);
    if (!parentNode.rootId) {
        processed.set(node.state.id, node);
        return node;
    }
    const child = parentNode.children.find(ch => ch.childStateId === node.state.id);
    const result = Object.assign({}, node, { traceToRoot: [...parentNode.traceToRoot, child.fieldName], rootId: parentNode.rootId });
    processed.set(node.state.id, result);
    return result;
}
//# sourceMappingURL=populateTraceToRoot.js.map