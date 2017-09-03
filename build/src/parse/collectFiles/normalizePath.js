"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizePath(path) {
    path = path.replace(/\\/g, '/');
    if (path.endsWith('/')) {
        path = path.substr(0, path.length - 1);
    }
    return path;
}
exports.normalizePath = normalizePath;
//# sourceMappingURL=normalizePath.js.map