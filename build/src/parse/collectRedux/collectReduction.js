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
function collectReduction(options, path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield tools_1.readFile(__1.combinePath(path, file));
        const imports = _1.parseImports(options, content, path);
        return parseReductions(content, _1.createFileImport(path, file), imports);
    });
}
exports.collectReduction = collectReduction;
const funcRegex = /export function ([^\(]*)\(([^\)]*)\): ([^{]*)/g;
function parseReductions(content, path, imports) {
    const matches = tools_2.execRegex(funcRegex, content);
    return matches.map(match => toReduction(path, match, imports)).filter(r => r);
}
function toReduction(path, match, imports) {
    const [content, name, args, returnTypeName] = match;
    const returnType = imports[returnTypeName.trim()];
    if (!returnType) {
        return null;
    }
    const parameters = parseParameters(args).map(parm => toField(parm, imports));
    if (parameters.length && parameters[0].typename !== returnType.name) {
        return null;
    }
    return {
        path,
        name: name.trim(),
        stateId: returnType.id,
        parameters: parameters
    };
}
function toField(parm, imports) {
    const split = parm.split(':');
    return _2.createField(split[0], split[1], imports);
}
function findParameterEnd(content, index) {
    let angleBracketCount = 0;
    while (index < content.length) {
        if (content[index] === '<') {
            angleBracketCount++;
        }
        if (content[index] === '>' && angleBracketCount > 0) {
            angleBracketCount--;
        }
        if (content[index] === ',' && angleBracketCount === 0) {
            break;
        }
        index++;
    }
    return index;
}
function parseParameters(content) {
    let index = 0;
    const result = [];
    while (index < content.length) {
        const end = findParameterEnd(content, index);
        const parameter = content.substr(index, end - index).trim();
        if (parameter.length) {
            result.push(parameter);
        }
        index = end + 1;
    }
    return result;
}
//# sourceMappingURL=collectReduction.js.map