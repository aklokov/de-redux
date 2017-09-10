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
const _ = require("lodash");
function parseFiles(options, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const filesModel = yield collectFiles_1.collectFiles(path);
        const statePromises = _1.filterStates(options, filesModel.states)
            .map(file => _1.prepareFile(options, file).then(parseState_1.parseStateFile));
        const reductionPromises = filesModel.reductions
            .map(file => _1.prepareFile(options, file).then(parseReduction_1.parseReductionFile));
        const [states, reductions] = yield Promise.all([Promise.all(statePromises), Promise.all(reductionPromises)]);
        return {
            states: _.flatten(states),
            reductions: _.flatten(reductions)
        };
    });
}
exports.parseFiles = parseFiles;
//# sourceMappingURL=parse.js.map