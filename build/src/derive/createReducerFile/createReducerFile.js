"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const constants_1 = require("../../constants");
const _1 = require(".");
const tools_1 = require("../../tools");
function createReducerFile(state, reductions, actionsFile, tree) {
    const reducerFile = createReducerFileName(state);
    const node = tree.nodesById[state.id];
    if (!reductions.length && !node.children.length) {
        return createUnlink(reducerFile);
    }
    const path = tools_1.trimFilename(reducerFile);
    const childReducers = node.children.map(child => createChildReducer(child, tree));
    const imports = _1.createImports(path, actionsFile.actionsFile, reductions, state);
    const childImports = _1.createChildReducerImports(path, childReducers);
    return {
        reducerFile,
        unlink: false,
        stateName: state.name,
        imports: [...imports, ...childImports],
        actions: reductions.map(red => _1.createReducerAction(red, state, tree)).filter(i => i),
        childReducers
    };
}
exports.createReducerFile = createReducerFile;
function createUnlink(file) {
    return {
        reducerFile: file,
        unlink: true,
        stateName: null,
        imports: null,
        actions: null,
        childReducers: null
    };
}
function createChildReducer(child, tree) {
    const childState = tree.nodesById[child.childStateId].state;
    return {
        fieldName: child.fieldName,
        path: createReducerFileName(childState)
    };
}
function createReducerFileName(state) {
    return __1.createFilePath(state.folder, state.name, constants_1.constants.reducerFile);
}
//# sourceMappingURL=createReducerFile.js.map