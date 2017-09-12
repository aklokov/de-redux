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
const typescript_reexport_generator_1 = require("typescript-reexport-generator");
function correctReexportPath(path, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDir = yield tools_1.isDirectory(path);
        if (!isDir) {
            return path;
        }
        const files = yield fse.readdir(path);
        for (let file of files) {
            if (file === 'index.ts' || !file.endsWith('.ts')) {
                continue;
            }
            const filePath = tools_1.combinePath(path, file);
            if (yield tools_1.isDirectory(filePath)) {
                continue;
            }
            const content = yield fse.readFile(tools_1.combinePath(path, file), 'utf8');
            if (typeIsExported(content, type)) {
                return tools_1.combinePath(path, tools_1.trimExtension(file));
            }
        }
        console.warn('type ' + type + ' export is not found in ' + path);
        return path;
    });
}
exports.correctReexportPath = correctReexportPath;
function typeIsExported(content, type) {
    const names = typescript_reexport_generator_1.getExportedNames(content);
    return tools_1.contains(names, type);
}
//# sourceMappingURL=correctReexportPath.js.map