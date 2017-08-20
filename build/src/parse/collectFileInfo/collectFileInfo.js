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
const _1 = require(".");
const tools_1 = require("../../tools");
const fse = require("fs-extra");
function read(path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return fse.readFile(tools_1.combinePath(path, file), 'utf8');
    });
}
function collectFileInfo(options, path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield read(path, file);
        const importPath = yield _1.createFileImport(path, file);
        const imports = _1.parseImports(options, content, path);
        return {
            importPath,
            file,
            content,
            imports
        };
    });
}
exports.collectFileInfo = collectFileInfo;
//# sourceMappingURL=collectFileInfo.js.map