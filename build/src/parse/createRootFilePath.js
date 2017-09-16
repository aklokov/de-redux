"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
const tools_1 = require("../tools");
const constants_1 = require("../constants");
function createRootFilePath(options) {
    if (!options.generateRootIn) {
        return null;
    }
    const fileName = changeCase.paramCase(options.rootStateName) + constants_1.constants.stateExt;
    return tools_1.combinePath(options.generateRootIn, fileName);
}
exports.createRootFilePath = createRootFilePath;
//# sourceMappingURL=createRootFilePath.js.map