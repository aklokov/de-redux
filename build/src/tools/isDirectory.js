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
const fse = require("fs-extra");
const _1 = require(".");
function isDirectory(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield fse.pathExists(path);
        if (!exists) {
            return false;
        }
        const stats = yield fse.lstat(path);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
exports.cachedIsDirectory = _1.cachedPromise(isDirectory);
//# sourceMappingURL=isDirectory.js.map