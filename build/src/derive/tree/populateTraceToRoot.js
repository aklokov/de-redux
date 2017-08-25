"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const hash_map_1 = require("hash-map");
function populateTraceToRoot(tree) {
    return _1.mapTree(populateTraceForNodes(tree), tree.rootState);
}
exports.populateTraceToRoot = populateTraceToRoot;
function populateTraceForNodes(tree) {
    let toProcessChildren = tree.nodes.filter(node => node.isRoot);
    const nodesMap = hash_map_1.stringMap();
    const processed = [...toProcessChildren];
    while (toProcessChildren.length) {
        const node = toProcessChildren.shift();
        node.children.forEach(child => {
            const processedNode = nodesMap[child.childStateId];
            if (processedNode) {
                processedNode.noSubscribe = true;
                processedNode.traceToRoot = [];
                return;
            }
            const childNode = Object.assign({}, tree.nodesById[child.childStateId], { traceToRoot: [...(node.traceToRoot || []), child.fieldName] });
            nodesMap[child.childStateId] = childNode;
            processed.push(childNode);
            toProcessChildren.push(childNode);
        });
    }
    return processed;
}
//# sourceMappingURL=populateTraceToRoot.js.map