"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createInitFields(node, tree) {
    const children = node.children.map(child => {
        return {
            field: child.fieldName,
            stateName: tree.nodesById.get(child.childStateId).state.name,
            isNull: !__1.needReducerFile(child.childStateId, tree)
        };
    });
    const fields = node.state.fields
        .filter(field => !isChild(field, node))
        .map(field => ({ field: field.name, isNull: true, stateName: null }));
    return [...children, ...fields];
}
exports.createInitFields = createInitFields;
function isChild(field, node) {
    return node.children.some(child => child.fieldName === field.name);
}
//# sourceMappingURL=createInitFields.js.map