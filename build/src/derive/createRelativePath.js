"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRelativePath(path, src) {
    let pathSplit = path.split('/');
    let srcSplit = src.split('/');
    while (pathSplit.length && srcSplit.length && pathSplit[0] === srcSplit[0]) {
        pathSplit = pathSplit.slice(1);
        srcSplit = srcSplit.slice(1);
    }
    const resultSplit = [...srcSplit.map(s => '..'), ...pathSplit];
    return resultSplit.join('/');
}
exports.createRelativePath = createRelativePath;
//# sourceMappingURL=createRelativePath.js.map