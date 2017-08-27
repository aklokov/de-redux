"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const _1 = require(".");
function createFieldImports(path, fields) {
    const imported = _.flatten(fields.map(field => field.imported));
    const unique = _.uniqBy(imported, imp => imp.id);
    const grouped = _.groupBy(unique, un => un.path);
    const result = [];
    _.forIn(grouped, grp => {
        result.push(_1.createTypeImport(grp, path));
    });
    return result;
}
exports.createFieldImports = createFieldImports;
//# sourceMappingURL=createFieldImports.js.map