"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function populateIsRoot(tree) {
    return _1.mapTree(tree.nodes.map(node => populateNodeIsRoot(node, tree)));
}
exports.populateIsRoot = populateIsRoot;
function populateNodeIsRoot(node, tree) {
    const parents = tree.nodes.filter(parent => getLinks(parent, node).length > 0);
    return parents.length ? node : rootNode(node);
}
function getLinks(parent, node) {
    return parent.children.filter(child => child.childStateId === node.state.id);
}
function rootNode(node) {
    return Object.assign({}, node, { isRoot: true });
}
//# sourceMappingURL=populateIsRoot.js.map