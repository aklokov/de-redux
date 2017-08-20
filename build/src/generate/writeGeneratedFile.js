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
const tools_1 = require("../tools");
function needToWrite(path, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield fse.pathExists(path);
        if (!exists) {
            return true;
        }
        const existing = yield fse.readFile(path, 'utf8');
        return content !== existing;
    });
}
function gracefulWriteFile(path, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const need = yield needToWrite(path, content);
        if (!need) {
            return;
        }
        try {
            yield fse.writeFile(path, content);
            console.log('Written ' + path);
        }
        catch (err) {
            console.log('Error writing ' + path + '\n' + err);
        }
    });
}
exports.gracefulWriteFile = gracefulWriteFile;
function writeGeneratedFile(path, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fse.ensureDir(tools_1.trimFilename(path));
            const written = yield gracefulWriteFile(path, content);
            if (written) {
                console.log('written file ' + path);
            }
        }
        catch (err) {
            console.log('error writing ' + path + ' : ' + err);
        }
    });
}
exports.writeGeneratedFile = writeGeneratedFile;
//# sourceMappingURL=writeGeneratedFile.js.map