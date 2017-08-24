"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_map_1 = require("hash-map");
function createRootNode(state, rootNodes) {
    const nodesById = hash_map_1.toStringMap(rootNodes, node => node.state.id);
    return {
        state,
        children: state.fields.map(field => createNodeChild(field, nodesById)).filter(s => s),
        isRoot: true,
        parentId: null,
        parentFieldName: null,
        traceToRoot: null
    };
}
exports.createRootNode = createRootNode;
function createNodeChild(field, nodesById) {
    const node = nodesById[field.imported[0].id];
    return {
        childStateId: node.state.id,
        fieldName: field.name
    };
}
//# sourceMappingURL=createRootNode.js.map