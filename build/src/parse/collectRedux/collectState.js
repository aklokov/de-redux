"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const _1 = require(".");
const tools_2 = require("../../tools");
const _2 = require(".");
const hash_map_1 = require("hash-map");
const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
function collectState(options, importPath, file, content) {
    const imports = _1.parseImports(options, content, importPath);
    const matches = tools_2.execRegex(typeRegex, content);
    const tempStates = matches.map(match => createTempState(importPath, match[1], match[2]));
    const fullImports = Object.assign({}, imports, hash_map_1.toStringMap(tempStates, ts => ts.name));
    return tempStates.map(ts => toState(ts, fullImports));
}
exports.collectState = collectState;
function createTempState(path, name, content) {
    return {
        id: tools_1.combinePath(path, name),
        name: name,
        path: path,
        content: content
    };
}
const fieldRegex = /(.*):([^;]*);?/g;
function toState(ts, imports) {
    const matches = tools_2.execRegex(fieldRegex, ts.content);
    return {
        id: ts.id,
        name: ts.name,
        path: ts.path,
        fields: matches.map(match => _2.createField(match[1], match[2], imports))
    };
}
//# sourceMappingURL=collectState.js.map