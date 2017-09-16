"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const collectFiles_1 = require("./collectFiles");
function getStates(options, files) {
    const rootFilePath = _1.createRootFilePath(options);
    const filtered = getFilePathsByType(files, collectFiles_1.FileType.State);
    return filtered.filter(file => file !== rootFilePath);
}
exports.getStates = getStates;
function getReductions(files) {
    return getFilePathsByType(files, collectFiles_1.FileType.Reduction);
}
exports.getReductions = getReductions;
function getFilePathsByType(files, type) {
    return files.filter(file => file.type === type).map(file => file.filePath);
}
//# sourceMappingURL=getStatesAndReductions.js.map