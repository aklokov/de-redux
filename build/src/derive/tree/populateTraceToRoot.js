"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const hash_map_1 = require("hash-map");
function populateTraceToRoot(tree) {
    return _1.mapTree(populateTraceForNodes(tree), tree.rootState);
}
exports.populateTraceToRoot = populateTraceToRoot;
function populateTraceForNodes(tree) {
    const processed = hash_map_1.stringMap();
    return tree.nodes.map(node => populateTraceForNode(node, tree.nodesById, processed));
}
function populateTraceForNode(node, byId, processed) {
    if (node.parentIds.length !== 1) {
        return node;
    }
    const processedNode = processed[node.state.id];
    if (processedNode) {
        return processedNode;
    }
    const parentNode = populateTraceForNode(byId[node.parentIds[0]], byId, processed);
    if (!parentNode.rootId) {
        return processed[node.state.id] = node;
    }
    const child = parentNode.children.find(ch => ch.childStateId === node.state.id);
    const result = Object.assign({}, node, { traceToRoot: [...parentNode.traceToRoot, child.fieldName], rootId: parentNode.rootId });
    return processed[node.state.id] = result;
}
//# sourceMappingURL=populateTraceToRoot.js.map