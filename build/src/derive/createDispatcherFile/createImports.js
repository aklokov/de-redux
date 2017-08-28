"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createImports(path, actions, reductions, state) {
    const actionsImport = __1.createActionsImport(path, actions);
    const fieldImports = __1.createReductionImports(path, reductions);
    return [actionsImport, ...fieldImports, ...__1.createTypeImports(path, [state])];
}
exports.createImports = createImports;
function createFullImports(path, actions, reductions, state, rootState) {
    return [...createImports(path, actions, reductions, state), ...__1.createTypeImports(path, [rootState])];
}
exports.createFullImports = createFullImports;
//# sourceMappingURL=createImports.js.map