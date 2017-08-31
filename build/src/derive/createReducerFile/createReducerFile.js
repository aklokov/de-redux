"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const _1 = require(".");
const _2 = require(".");
const tools_1 = require("../../tools");
const __2 = require("..");
function createReducerFile(state, tree) {
    const reducerFile = __1.createReducerFileName(state);
    const node = tree.nodesById[state.id];
    if (!__2.needReducerFile(state.id, tree)) {
        return createUnlink(reducerFile);
    }
    const needActions = __2.needActionsFile(state.id, tree);
    const reductions = tree.reductionMap[state.id] || [];
    const path = tools_1.trimFilename(reducerFile);
    const childReducers = node.children
        .filter(child => __2.needReducerFile(child.childStateId, tree))
        .map(child => createChildReducer(child, tree));
    const imports = needActions
        ? _1.createImportsWithAction(path, reductions, state)
        : _1.createImports(path, reductions, state);
    const childImports = _1.createChildReducerImports(path, childReducers);
    const exportedActions = _2.createExportedActions(childReducers, needActions);
    const needInit = !reductions.some(red => __1.isInit(red));
    const initFields = needInit ? _2.createInitFields(node, tree) : [];
    return {
        reducerFile,
        unlink: false,
        stateName: state.name,
        imports: [...imports, ...childImports],
        actions: reductions.filter(r => !__1.isInit(r)).map(r => _2.createReducerAction(r)),
        childReducers,
        exportedActions,
        initFields
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
        childReducers: null,
        exportedActions: null,
        initFields: null
    };
}
function createChildReducer(child, tree) {
    const childState = tree.nodesById[child.childStateId].state;
    return {
        fieldName: child.fieldName,
        path: __1.createReducerFileName(childState)
    };
}
//# sourceMappingURL=createReducerFile.js.map