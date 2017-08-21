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
const _1 = require(".");
function correctReexportPath(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDir = yield tools_1.cachedIsDirectory(path);
        if (isDir) {
            return path;
        }
        const index = path.lastIndexOf('/');
        const filename = path.substr(index + 1);
        const dir = path.substr(0, index);
        const reexport = yield _1.hasReexport(dir, filename);
        return reexport ? dir : path;
    });
}
exports.correctReexportPath = correctReexportPath;
//# sourceMappingURL=correctReexportPath.js.map