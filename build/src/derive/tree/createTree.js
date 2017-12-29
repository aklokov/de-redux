"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_tools_1 = require("@vlr/map-tools");
const _1 = require(".");
function createTree(options, states) {
    const statesById = map_tools_1.map(states, state => state.id);
    const tree = _1.mapTree(states.map(state => _1.createNode(state, statesById)));
    return _1.populateParentIds(tree);
}
exports.createTree = createTree;
//# sourceMappingURL=createTree.js.map