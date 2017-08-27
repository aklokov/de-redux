"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const __2 = require("..");
const constants_1 = require("../../constants");
const tools_1 = require("../../tools");
const _ = require("lodash");
const changeCase = require("change-case");
function createActionFile(state, reductions) {
    const actionsFile = __1.createFilePath(state.folder, state.name, constants_1.constants.actionsFile);
    if (!reductions.length) {
        return {
            actionsFile,
            unlink: true,
            actions: [],
            imports: []
        };
    }
    const path = tools_1.trimFilename(actionsFile);
    return {
        actionsFile,
        unlink: false,
        actions: reductions.filter(red => !__1.isInit(red)).map(reduction => createAction(state.name, reduction)),
        imports: __2.createFieldImports(path, _.flatten(reductions.map(red => red.parameters.slice(1))))
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