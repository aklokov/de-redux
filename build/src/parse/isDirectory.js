"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const fs = require("fs");
function isDirectory(path, file) {
    return fs.lstatSync(_1.combinePath(path, file)).isDirectory();
}
exports.isDirectory = isDirectory;
//# sourceMappingURL=isDirectory.js.map