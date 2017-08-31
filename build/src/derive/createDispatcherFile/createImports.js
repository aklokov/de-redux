"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createImports(path, state, tree) {
    const reductions = tree.reductionMap[state.id] || [];
    let imports = [...__1.createReductionImports(path, reductions), ...__1.createTypeImports(path, [state])];
    if (__1.needActionsFile(state.id, tree)) {
        imports.push(__1.createActionsImport(path, __1.createActionFileName(state)));
    }
    if (__1.canSubscribe(state.id, tree)) {
        const node = tree.nodesById[state.id];
        if (node.rootId !== state.id) {
            imports = [...imports, ...__1.createTypeImports(path, [tree.nodesById[node.rootId].state])];
        }
    }
    return imports;
}
exports.createImports = createImports;
//# sourceMappingURL=createImports.js.map