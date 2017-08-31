"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
const constants_1 = require("../constants");
function createFilePath(path, name, suffix) {
    const kebabName = changeCase.paramCase(name);
    return `${path}/gen/${kebabName}${suffix}.ts`;
}
function createActionFileName(state) {
    return createFilePath(state.folder, state.name, constants_1.constants.actionsFile);
}
exports.createActionFileName = createActionFileName;
function createReducerFileName(state) {
    return createFilePath(state.folder, state.name, constants_1.constants.reducerFile);
}
exports.createReducerFileName = createReducerFileName;
function createDispatcherFileName(state) {
    return createFilePath(state.folder, state.name, constants_1.constants.dispatcherFile);
}
exports.createDispatcherFileName = createDispatcherFileName;
//# sourceMappingURL=createFilePath.js.map