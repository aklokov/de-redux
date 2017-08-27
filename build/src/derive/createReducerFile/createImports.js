"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __1 = require("..");
const __2 = require("..");
const stringMap = {
    importLine: '{ stringMap }',
    path: 'hash-map'
};
function createImports(path, actions, reductions, state) {
    const actionsImport = {
        importLine: '* as actions',
        path: __1.createRelativePathToFile(actions, path)
    };
    const fieldImports = __2.createFieldImports(path, _.flatten(reductions.map(red => red.parameters)));
    const reductionImports = __2.createTypeImports(path, reductions);
    return [actionsImport, stringMap, ...fieldImports, ...reductionImports];
}
exports.createImports = createImports;
function createReductionImport(path, reduction) {
    return {
        importLine: `{ ${reduction.name} }`,
        path: __1.createRelativePath(reduction.path, path)
    };
}
function createChildReducerImports(path, children) {
    return children.map(child => ({
        importLine: `{ reducer as ${child.fieldName}Reducer, allActions as ${child.fieldName}Actions }`,
        path: __1.createRelativePathToFile(child.path, path)
    }));
}
exports.createChildReducerImports = createChildReducerImports;
//# sourceMappingURL=createImports.js.map