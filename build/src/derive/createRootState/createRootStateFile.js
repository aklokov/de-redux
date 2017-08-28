"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const tools_1 = require("../../tools");
function createRootStateFile(tree) {
    const state = tree.rootState;
    const rootFile = state.path + '.ts';
    const path = tools_1.trimFilename(state.path);
    const imports = __1.createFieldImports(path, state.fields);
    return {
        rootStateFile: rootFile,
        state,
        imports
    };
}
exports.createRootStateFile = createRootStateFile;
//# sourceMappingURL=createRootStateFile.js.map