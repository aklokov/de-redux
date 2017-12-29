"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_tools_1 = require("@vlr/map-tools");
function mapTree(nodes, rootState) {
    return {
        nodes,
        nodesById: map_tools_1.map(nodes, node => node.state.id),
        rootState
    };
}
exports.mapTree = mapTree;
//# sourceMappingURL=mapTree.js.map