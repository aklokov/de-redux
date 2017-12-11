"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
function createFields(rootNodes) {
    const namesMap = new Map();
    const fields = [];
    rootNodes.forEach(node => {
        const name = createName(node.state.name, namesMap);
        fields.push({
            name,
            typename: node.state.name,
            imported: [node.state]
        });
    });
    return fields;
}
exports.createFields = createFields;
function createName(typeName, names) {
    let name = changeCase.camelCase(typeName);
    let i = 1;
    while (names.has(name)) {
        name = name + (i++);
    }
    names.set(name, true);
    return name;
}
//# sourceMappingURL=createFields.js.map