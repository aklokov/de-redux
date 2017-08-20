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
const __1 = require("..");
const tools_1 = require("../../tools");
const _1 = require(".");
const tools_2 = require("../../tools");
const _2 = require(".");
function collectState(options, path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield tools_1.readFile(__1.combinePath(path, file));
        const imports = _1.parseImports(options, content, path);
        return parseStates(content, _1.createFileImport(path, file), imports);
    });
}
exports.collectState = collectState;
const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
function parseStates(content, path, imports) {
    const matches = tools_2.execRegex(typeRegex, content);
    const tempStates = matches.map(match => createTempState(path, match[1], match[2]));
    const fullImports = Object.assign({}, imports, tools_2.toStringMap(tempStates, ts => ts.name));
    return tempStates.map(ts => toState(ts, fullImports));
}
function createTempState(path, name, content) {
    return {
        id: __1.combinePath(path, name),
        name: name,
        path: path,
        content: content
    };
}
const fieldRegex = /(.*):([^;]*);?/g;
function toState(ts, imports) {
    const matches = tools_2.execRegex(fieldRegex, ts.content);
    return {
        id: ts.id,
        name: ts.name,
        path: ts.path,
        fields: matches.map(match => _2.createField(match[1], match[2], imports))
    };
}
//# sourceMappingURL=collectState.js.map