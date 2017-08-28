"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
const constants_1 = require("../../constants");
const tools_1 = require("../../tools");
const _1 = require(".");
function createRootState(tree, path, name) {
    const rootNodes = tree.nodes.filter(_1.isRoot);
    const restOfNodes = tree.nodes.filter(node => !_1.isRoot(node));
    const state = createState(name, path, rootNodes);
    const rootNode = _1.createRootNode(state, rootNodes);
    const nodes = [rootNode, ...rootNodes.map(node => fixNode(node, rootNode)), ...restOfNodes];
    return _1.mapTree(nodes, state);
}
exports.createRootState = createRootState;
function fixNode(node, rootNode) {
    return Object.assign({}, node, { parentIds: [rootNode.state.id] });
}
function createState(name, path, rootNodes) {
    const stateFile = changeCase.paramCase(name) + constants_1.constants.state;
    const statePath = tools_1.combinePath(path, stateFile);
    const id = tools_1.combinePath(statePath, name);
    return {
        id,
        name,
        folder: path,
        path: statePath,
        fields: _1.createFields(rootNodes)
    };
}
//# sourceMappingURL=createRootState.js.map