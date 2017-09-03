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
const constants_1 = require("../../constants");
const hash_map_1 = require("hash-map");
const tools_1 = require("../../tools");
function getFolderModel(files) {
    return __awaiter(this, void 0, void 0, function* () {
        const reexports = yield _1.getReexports(files);
        const dict = hash_map_1.toStringDict(reexports, s => s, s => true);
        const stateFiles = filterFiles(files, constants_1.constants.stateExt);
        const reductionFiles = filterFiles(files, constants_1.constants.reductionExt);
        return {
            states: getFiles(stateFiles, dict),
            reductions: getFiles(reductionFiles, dict)
        };
    });
}
exports.getFolderModel = getFolderModel;
function filterFiles(files, suffix) {
    return files.filter(file => file.file.endsWith(suffix));
}
function getFiles(files, dict) {
    return files.map(file => getFile(file, dict));
}
function getFile(file, dict) {
    const trimmed = tools_1.trimExtension(file.file);
    const importPath = dict[trimmed] ? tools_1.trimFilename(file.fullPath) : tools_1.trimExtension(file.fullPath);
    return {
        filePath: file.fullPath,
        importPath
    };
}
//# sourceMappingURL=getFolderModel.js.map