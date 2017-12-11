"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const maptools_1 = require("maptools");
const _ = require("lodash");
function populateParentIds(tree) {
    return _1.mapTree(populateNodesParentIds(tree.nodes));
}
exports.populateParentIds = populateParentIds;
function populateNodesParentIds(nodes) {
    const pairs = _.flatten(nodes.map(getPairs));
    const pairsLookup = maptools_1.lookup(pairs, pair => pair.childId, pair => pair.parentId);
    return nodes.map(node => (Object.assign({}, node, { parentIds: pairsLookup.get(node.state.id) || [] })));
}
function getPairs(node) {
    return node.children.map(child => ({ parentId: node.state.id, childId: child.childStateId }));
}
//# sourceMappingURL=populateParentIds.js.map