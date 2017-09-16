"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trimExtension(file) {
    return stripLast(file, '.');
}
exports.trimExtension = trimExtension;
function trimFilename(path) {
    return stripLast(path, '/');
}
exports.trimFilename = trimFilename;
function stripLast(line, symbol) {
    const index = line.lastIndexOf(symbol);
    if (index === -1) {
        return line;
    }
    return line.substr(0, index);
}
exports.stripLast = stripLast;
//# sourceMappingURL=stripLast.js.map