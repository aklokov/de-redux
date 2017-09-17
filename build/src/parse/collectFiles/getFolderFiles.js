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
function getFolderFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasFiles = files.map(file => getFileType(file.file)).some(file => !!file);
        if (!hasFiles) {
            return [];
        }
        const reexports = yield _1.getReexports(files);
        const map = hash_map_1.toStringDict(reexports, r => r, r => true);
        return files.map(file => getFile(file, isReexported(file.file, map))).filter(file => file);
    });
}
exports.getFolderFiles = getFolderFiles;
function getFile(file, reexported) {
    const type = getFileType(file.file);
    if (!type) {
        return null;
    }
    return { filePath: file.fullPath, type, reexported };
}
function isReexported(file, map) {
    const filename = file.substr(file.lastIndexOf('/') + 1);
    const withoutExt = tools_1.trimExtension(filename);
    return !!map[file];
}
function getFileType(file) {
    if (fileIs(file, constants_1.constants.stateExt)) {
        return _1.FileType.State;
    }
    else if (fileIs(file, constants_1.constants.reductionExt)) {
        return _1.FileType.Reduction;
    }
    return null;
}
function fileIs(file, suffix) {
    return file.length > suffix.length && file.endsWith(suffix);
}
//# sourceMappingURL=getFolderFiles.js.map