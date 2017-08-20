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
const collectRedux_1 = require("./collectRedux");
const constants_1 = require("../constants");
function parseFiles(options, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield tools_1.readDir(path);
        const promises = files.map(file => collectFile(options, path, file)).filter(promise => promise);
        const models = yield Promise.all(promises);
        return _1.mergeModels(models);
    });
}
exports.parseFiles = parseFiles;
function collectFile(options, path, file) {
    if (_1.isDirectory(path, file)) {
        return parseFiles(options, _1.combinePath(path, file));
    }
    if (file.endsWith(constants_1.constants.stateExt)) {
        return collectRedux_1.collectState(options, path, file)
            .then(states => ({ reductions: [], states }));
    }
    if (file.endsWith(constants_1.constants.reductionExt)) {
        return collectRedux_1.collectReduction(options, path, file)
            .then(reductions => ({ reductions, states: [] }));
    }
    return null;
}
//# sourceMappingURL=parse.js.map