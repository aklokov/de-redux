"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const tools_2 = require("../../tools");
const _1 = require(".");
const map_tools_1 = require("@vlr/map-tools");
const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
function collectState(options, fileInfo) {
    const matches = tools_2.execRegex(typeRegex, fileInfo.content);
    const tempStates = matches.map(match => createTempState(fileInfo.folder, fileInfo.importPath, match[1], match[2]));
    const fullImports = map_tools_1.merge(fileInfo.imports, map_tools_1.map(tempStates, ts => ts.name));
    return tempStates.map(ts => toState(ts, fullImports));
}
exports.collectState = collectState;
function createTempState(folder, importPath, name, content) {
    return {
        id: tools_1.combinePath(importPath, name),
        folder,
        name: name,
        path: importPath,
        content: content
    };
}
const fieldRegex = /(.*):([^;]*);?/g;
function toState(ts, imports) {
    const matches = tools_2.execRegex(fieldRegex, ts.content);
    return {
        id: ts.id,
        folder: ts.folder,
        name: ts.name,
        path: ts.path,
        fields: matches.map(match => _1.createField(match[1], match[2], imports))
    };
}
//# sourceMappingURL=collectState.js.map