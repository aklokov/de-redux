"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function populateParentIds(tree) {
    return _1.mapTree(tree.nodes.map(node => populeteNodeParentIds(node, tree)));
}
exports.populateParentIds = populateParentIds;
function populeteNodeParentIds(node, tree) {
    const parents = tree.nodes.filter(parent => getLinks(parent, node).length > 0);
    if (parents.length === 0) {
        return rootNode(node);
    }
    const parent = parents[0];
    const links = getLinks(parent, node);
    if (parents.length > 1 || links.length > 1) {
        return node;
    }
    return childNode(node, parent.state.id, links[0].fieldName);
}
function getLinks(parent, node) {
    return parent.children.filter(child => child.childStateId === node.state.id);
}
function rootNode(node) {
    return Object.assign({}, node, { isRoot: true });
}
function childNode(node, parentId, fieldName) {
    return Object.assign({}, node, { parentId, parentFieldName: fieldName });
}
//# sourceMappingURL=populateParentIds.js.map