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
const parseImports_1 = require("./parseImports");
const tools_1 = require("../tools");
const fse = require("fs-extra");
function prepareFile(options, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield fse.readFile(filePath, 'utf8');
        const imports = parseImports_1.parseImports(options.tsconfig, content, tools_1.trimFilename(filePath));
        return { filePath, content, imports };
    });
}
exports.prepareFile = prepareFile;
//# sourceMappingURL=prepareFile.js.map