"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
const tools_1 = require("../../tools");
const _ = require("lodash");
const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
function parseImports(options, content, path) {
    const matches = tools_1.execRegex(regex, content);
    const types = _.flatten(matches.map(match => parseMatch(options, match[1], match[2], path)));
    return tools_1.toStringMap(types, type => type.name);
}
exports.parseImports = parseImports;
function parseMatch(options, types, importline, path) {
    const typenames = types.split(',');
    const resultPath = _1.calculatePath(options, path, importline);
    return typenames.map(typename => createType(typename, resultPath));
}
function createType(name, path) {
    const resultName = name.trim();
    return {
        id: __1.combinePath(path, resultName),
        name: resultName,
        path
    };
}
//# sourceMappingURL=parseImports.js.map