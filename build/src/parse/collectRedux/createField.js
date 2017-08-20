"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createField(name, typename, imports) {
    const split = typename.replace(/[\[|\]|\s]/g, '').split(/[<|>]/);
    return {
        name: name.trim(),
        typename: typename.trim(),
        imported: split.map(type => imports[type.trim()]).filter(type => type)
    };
}
exports.createField = createField;
//# sourceMappingURL=createField.js.map