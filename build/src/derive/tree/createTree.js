"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maptools_1 = require("maptools");
const _1 = require(".");
function createTree(options, states) {
    const statesById = maptools_1.map(states, state => state.id);
    const tree = _1.mapTree(states.map(state => _1.createNode(state, statesById)));
    return _1.populateParentIds(tree);
}
exports.createTree = createTree;
//# sourceMappingURL=createTree.js.map