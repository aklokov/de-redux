"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
function createFilePath(path, name, suffix) {
    const kebabName = changeCase.paramCase(name);
    return `${path}/gen/${kebabName}${suffix}.ts`;
}
exports.createFilePath = createFilePath;
//# sourceMappingURL=createFilePath.js.map