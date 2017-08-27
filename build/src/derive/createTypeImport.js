"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function createTypeImport(types, src) {
    const path = types[0].path;
    const names = types.map(type => type.name).join(', ');
    return {
        importLine: `{ ${names} }`,
        path: _1.createRelativePath(path, src)
    };
}
exports.createTypeImport = createTypeImport;
//# sourceMappingURL=createTypeImport.js.map