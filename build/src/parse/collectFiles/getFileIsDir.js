"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const fse = require("fs-extra");
function getFilesWithIsDir(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fse.readdir(path);
        const results = yield Promise.all(files.map(file => getFileIsDir(path, file)));
        return results;
    });
}
exports.getFilesWithIsDir = getFilesWithIsDir;
function getFileIsDir(path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fullPath = tools_1.combinePath(path, file);
        const isDir = yield tools_1.isDirectory(fullPath);
        return {
            file,
            fullPath,
            isDir
        };
    });
}
//# sourceMappingURL=getFileIsDir.js.map