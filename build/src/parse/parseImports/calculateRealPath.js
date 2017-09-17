"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const tools_1 = require("../../tools");
function calculateRealPath(tsconfig, path, importLine) {
    const splitPath = path.split('/');
    const splitImport = importLine.replace(/\\/g, '/').split('/').filter(line => line.length);
    if (splitImport[0] !== '.' && splitImport[0] !== '..') {
        return applyPath(tsconfig, splitImport);
    }
    return calculateDiff(splitPath, splitImport);
}
exports.calculateRealPath = calculateRealPath;
function applyPath(tsconfig, split) {
    split[0] = tryReplace(tsconfig, split[0]);
    return split.join('/');
}
function tryReplace(tsconfig, first) {
    const pathstart = tsconfig.baseUrl;
    if (!tsconfig || !tsconfig.baseUrl) {
        return first;
    }
    let result = first;
    _.forIn(tsconfig.paths, (repl, path) => {
        if (path === first) {
            result = tools_1.combinePath(pathstart, repl[0]);
        }
        else if (path === first + '/*') {
            result = tools_1.combinePath(pathstart, repl[0].substr(0, repl[0].length - 2));
        }
    });
    return result;
}
function calculateDiff(path, imp) {
    imp.forEach(line => {
        if (line === '..') {
            path = subtractPath(path);
        }
        else if (line !== '.') {
            path = [...path, line];
        }
    });
    return path.join('/');
}
function subtractPath(path) {
    const lastLine = tools_1.last(path);
    if (lastLine === '.') {
        const lastRemoved = path.slice(0, path.length - 1);
        return [...lastRemoved, '..'];
    }
    else if (lastLine === '..') {
        return [...path, '..'];
    }
    else {
        return path.slice(0, path.length - 1);
    }
}
//# sourceMappingURL=calculateRealPath.js.map