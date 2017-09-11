"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const __2 = require("..");
const tools_1 = require("../../tools");
const __3 = require("..");
function createActionFile(state, tree) {
    const actionsFile = __1.createActionFileName(state);
    if (!__3.needActionsFile(state.id, tree)) {
        return createUnlink(actionsFile);
    }
    const reductions = tree.reductionMap[state.id];
    const path = tools_1.trimFilename(actionsFile);
    return {
        actionsFile,
        unlink: false,
        stateName: state.name,
        actions: reductions.filter(red => !__1.isInit(red)).map(reduction => createAction(state.name, reduction)),
        imports: __2.createReductionImports(path, reductions)
    };
}
exports.createActionFile = createActionFile;
function createUnlink(file) {
    return {
        actionsFile: file,
        unlink: true,
        stateName: null,
        actions: null,
        imports: null
    };
}
function createAction(stateName, reduction) {
    const fields = reduction.parameters.slice(1).map(parm => `public ${parm.name}: ${parm.typename}`);
    const parameters = fields.join(', ');
    const actionName = __1.createActionName(reduction);
    return {
        constantName: actionName.constantName,
        constantContent: `[${stateName}] - ${reduction.name}`,
        name: actionName.actionName,
        parameters,
        noConstructor: !parameters.length
    };
}
//# sourceMappingURL=createActionFile.js.map