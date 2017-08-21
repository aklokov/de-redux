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
const tools_1 = require("../../tools");
const constants_1 = require("../../constants");
const reexportRegex = /export \* from '.\/([^\']*)'/g;
function getReexports(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const indexFile = tools_1.combinePath(path, constants_1.constants.index);
        const exists = yield fse.pathExists(indexFile);
        if (!exists) {
            return [];
        }
        const content = yield fse.readFile(tools_1.combinePath(path, constants_1.constants.index), 'utf8');
        return tools_1.execRegex(reexportRegex, content).map(match => match[1]);
    });
}
exports.cachedReexports = tools_1.cachedPromise(getReexports);
//# sourceMappingURL=cachedReexport.js.map