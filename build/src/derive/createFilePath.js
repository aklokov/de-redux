"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
const _1 = require(".");
function createFilePath(path, name, suffix) {
    const kebabName = changeCase.paramCase(name);
    return `${_1.truncatePath(path)}/gen/${kebabName}${suffix}.ts`;
}
exports.createFilePath = createFilePath;
//# sourceMappingURL=createFilePath.js.map