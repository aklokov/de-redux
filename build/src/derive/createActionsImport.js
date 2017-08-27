"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function createActionsImport(path, actions) {
    return {
        importLine: '* as actions',
        path: _1.createRelativePathToFile(actions, path)
    };
}
exports.createActionsImport = createActionsImport;
//# sourceMappingURL=createActionsImport.js.map