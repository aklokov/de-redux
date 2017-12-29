"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_tools_1 = require("@vlr/map-tools");
function createRootNode(state, rootNodes) {
    const nodesById = map_tools_1.map(rootNodes, node => node.state.id);
    return {
        state,
        children: state.fields.map(field => createNodeChild(field, nodesById)).filter(s => s),
        traceToRoot: [],
        parentIds: [],
        rootId: state.id
    };
}
exports.createRootNode = createRootNode;
function createNodeChild(field, nodesById) {
    const node = nodesById.get(field.imported[0].id);
    return {
        childStateId: node.state.id,
        fieldName: field.name
    };
}
//# sourceMappingURL=createRootNode.js.map