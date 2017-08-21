"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const constants_1 = require("../constants");
const _ = require("lodash");
const changeCase = require("change-case");
function createActionFile(state, reductions) {
    const filePath = _1.createFilePath(state.folder, state.name, constants_1.constants.actionsFile);
    return {
        actionsFile: filePath,
        actions: reductions.filter(red => !_1.isInit(red)).map(reduction => createAction(state.name, reduction)),
        imports: _1.createImports(filePath, _.flatten(reductions.map(red => red.parameters.slice(1))))
    };
}
exports.createActionFile = createActionFile;
function createAction(stateName, reduction) {
    const fields = reduction.parameters.slice(1).map(parm => `public ${parm.name}: ${parm.typename}`);
    const parameters = fields.join(', ');
    return {
        constantName: changeCase.constantCase(reduction.name),
        constantContent: `[${stateName}] - ${reduction.name}`,
        name: changeCase.pascalCase(reduction.name) + 'Action',
        parameters,
        noConstructor: !parameters.length
    };
}
//# sourceMappingURL=createActionFile.js.map