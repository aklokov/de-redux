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
const collectFiles_1 = require("./collectFiles");
const _1 = require(".");
const parseState_1 = require("./parseState");
const parseReduction_1 = require("./parseReduction");
const fse = require("fs-extra");
function parseFiles(options, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const filesModel = yield collectFiles_1.collectFiles(path);
        const states = yield Promise.all(_1.filterStates(options, filesModel.states).map(getState));
        const reductions = yield Promise.all(filesModel.reductions.map(getReduction));
        return {
            states,
            reductions
        };
    });
}
exports.parseFiles = parseFiles;
function getState(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield fse.readFile(file.filePath, 'utf8');
        return parseState_1.parseState(file, content);
    });
}
function getReduction(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield fse.readFile(file.filePath, 'utf8');
        return parseReduction_1.parseReduction(file, content);
    });
}
//# sourceMappingURL=parse.js.map