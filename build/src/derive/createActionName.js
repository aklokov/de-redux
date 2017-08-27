"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
function createActionName(reduction) {
    return {
        constantName: changeCase.constantCase(reduction.name),
        actionName: changeCase.pascalCase(reduction.name) + 'Action'
    };
}
exports.createActionName = createActionName;
//# sourceMappingURL=createActionName.js.map