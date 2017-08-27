"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __1 = require("..");
const tools_1 = require("../../tools");
function createImports(path, fields) {
    const src = tools_1.trimFilename(path);
    const imported = _.flatten(fields.map(field => field.imported));
    const unique = _.uniqBy(imported, imp => imp.id);
    const grouped = _.groupBy(unique, un => un.path);
    const result = [];
    _.forIn(grouped, (grp, path) => {
        result.push(createImport(grp, path, src));
    });
    return result;
}
exports.createImports = createImports;
function createImport(types, path, src) {
    const names = types.map(type => type.name).join(', ');
    return {
        types: names,
        path: __1.createRelativePath(path, src)
    };
}
//# sourceMappingURL=createImports.js.map