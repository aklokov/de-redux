"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../tools");
function createRelativePath(path, src) {
    if (!path.startsWith('.') && !path.startsWith('..')) {
        return path;
    }
    let pathSplit = path.split('/');
    let srcSplit = src.split('/');
    while (pathSplit.length && srcSplit.length && pathSplit[0] === srcSplit[0]) {
        pathSplit = pathSplit.slice(1);
        srcSplit = srcSplit.slice(1);
    }
    const resultSplit = [...srcSplit.map(s => '..'), ...pathSplit];
    const result = resultSplit.join('/');
    if (!result.length) {
        return '.';
    }
    return result.startsWith('.') ? result : './';
}
exports.createRelativePath = createRelativePath;
function createRelativePathToFile(file, src) {
    const path = tools_1.trimFilename(file);
    const filename = tools_1.trimExtension(file.substr(file.lastIndexOf('/')));
    return createRelativePath(path, src) + filename;
}
exports.createRelativePathToFile = createRelativePathToFile;
//# sourceMappingURL=createRelativePath.js.map