"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _ = require("lodash");
function createReductionImports(path, reductions) {
    return _1.createFieldImports(path, _.flatten(reductions.map(red => red.parameters.slice(1))));
}
exports.createReductionImports = createReductionImports;
//# sourceMappingURL=createReductionsImports.js.map