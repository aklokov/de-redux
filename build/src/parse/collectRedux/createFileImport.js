"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createFileImport(path, file) {
    return __1.combinePath(path, file.substr(0, file.length - 3));
}
exports.createFileImport = createFileImport;
//# sourceMappingURL=createFileImport.js.map