"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_map_1 = require("hash-map");
function mapTree(nodes, rootState) {
    return {
        nodes,
        nodesById: hash_map_1.toStringMap(nodes, node => node.state.id),
        rootState
    };
}
exports.mapTree = mapTree;
//# sourceMappingURL=mapTree.js.map