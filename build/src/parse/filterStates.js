"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function filterStates(options, files) {
    const rootFilePath = _1.createRootFilePath(options);
    return files.filter(file => file.filePath !== rootFilePath);
}
exports.filterStates = filterStates;
//# sourceMappingURL=filterStates.js.map