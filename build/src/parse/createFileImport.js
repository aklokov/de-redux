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
const tools_1 = require("../tools");
function hasReexport(path, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const matches = yield _1.cachedReexports(path);
        return tools_1.contains(matches, filename);
    });
}
exports.hasReexport = hasReexport;
function createFileImport(path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = tools_1.trimExtension(file);
        const reexported = yield hasReexport(path, file);
        if (reexported) {
            return path;
        }
        return tools_1.combinePath(path, filename);
    });
}
exports.createFileImport = createFileImport;
//# sourceMappingURL=createFileImport.js.map