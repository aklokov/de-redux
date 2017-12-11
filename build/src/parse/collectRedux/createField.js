"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trimQuestionMark(name) {
    const trimmed = name.trim();
    if (trimmed.endsWith('?')) {
        return trimmed.substr(0, trimmed.length - 1);
    }
    return trimmed;
}
function createField(name, typename, imports) {
    const split = typename.replace(/[\[|\]|\s]/g, '').split(/[<|>]/);
    return {
        name: trimQuestionMark(name),
        typename: typename.trim(),
        imported: split.map(type => imports.get(type.trim())).filter(type => type)
    };
}
exports.createField = createField;
//# sourceMappingURL=createField.js.map