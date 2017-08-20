"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const _1 = require(".");
const funcRegex = /export function ([^\(]*)\(([^\)]*)\): ([^{]*)/g;
function collectReduction(options, fileInfo) {
    const matches = tools_1.execRegex(funcRegex, fileInfo.content);
    return matches.map(match => toReduction(fileInfo.importPath, match, fileInfo.imports)).filter(r => r);
}
exports.collectReduction = collectReduction;
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
    return _1.createField(split[0], split[1], imports);
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