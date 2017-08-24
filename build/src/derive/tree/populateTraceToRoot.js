"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function populateTraceToRoot(tree) {
    return _1.mapTree(tree.nodes.map(node => populateNodeTraceToRoot(node, tree)), tree.rootState);
}
exports.populateTraceToRoot = populateTraceToRoot;
function populateNodeTraceToRoot(node, tree) {
    if (!node.parentId) {
        return node;
    }
    const traceToRoot = getTrace(node.state.id, node, tree, []);
    return Object.assign({}, node, { traceToRoot });
}
function getTrace(id, node, tree, currentTrace) {
    if (node.parentId === id) {
        return null;
    }
    if (node.parentId === null) {
        return currentTrace;
    }
    const parentNode = tree.nodesById[node.parentId];
    return getTrace(id, parentNode, tree, [node.parentFieldName, ...currentTrace]);
}
//# sourceMappingURL=populateTraceToRoot.js.map