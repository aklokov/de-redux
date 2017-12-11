"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maptools_1 = require("maptools");
function mapTree(nodes, rootState) {
    return {
        nodes,
        nodesById: maptools_1.map(nodes, node => node.state.id),
        rootState
    };
}
exports.mapTree = mapTree;
//# sourceMappingURL=mapTree.js.map