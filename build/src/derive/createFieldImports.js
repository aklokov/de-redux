"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const _1 = require(".");
const tools_1 = require("../tools");
function createFieldImports(path, fields) {
    const types = _.flatten(fields.map(field => field.imported));
    return createTypeImports(path, types);
}
exports.createFieldImports = createFieldImports;
function createTypeImports(path, types) {
    const unique = _.uniqBy(types, imp => imp.id);
    const grouped = _.groupBy(unique, un => un.path);
    let result = [];
    _.forIn(grouped, grp => {
        const groups = tools_1.splitInGroups(grp, 5).map(grp => _1.createTypeImport(grp, path));
        result = [...result, ...groups];
    });
    return result;
}
exports.createTypeImports = createTypeImports;
//# sourceMappingURL=createFieldImports.js.map