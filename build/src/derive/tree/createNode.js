"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createNode(state, statesById) {
    return {
        state,
        children: state.fields.map(field => createNodeChild(field, statesById)).filter(s => s),
        isRoot: false,
        traceToRoot: null,
        noSubscribe: false
    };
}
exports.createNode = createNode;
function createNodeChild(field, statesById) {
    if (field.imported.length !== 1 || field.imported[0].name !== field.typename) {
        return null;
    }
    const state = statesById[field.imported[0].id];
    if (!state) {
        return null;
    }
    return {
        childStateId: state.id,
        fieldName: field.name
    };
}
//# sourceMappingURL=createNode.js.map