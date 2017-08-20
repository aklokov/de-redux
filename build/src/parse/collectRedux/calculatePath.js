"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const tools_1 = require("../../tools");
const __1 = require("..");
function calculatePath(options, path, importLine) {
    const splitPath = path.split('/');
    const splitImport = importLine.replace(/\\/g, '/').split('/');
    if (splitImport[0] !== '.' && splitImport[0] !== '..') {
        return applyPath(options, splitImport);
    }
    return calculateDiff(splitPath, splitImport);
}
exports.calculatePath = calculatePath;
function applyPath(options, split) {
    split[0] = tryReplace(options, split[0]);
    return split.join('/');
}
function tryReplace(options, first) {
    const pathstart = options.tsconfig.baseUrl;
    let result = first;
    _.forIn(options.tsconfig.paths, (repl, path) => {
        if (path === first) {
            result = __1.combinePath(pathstart, repl[0]);
        }
        else if (path === first + '/*') {
            result = __1.combinePath(pathstart, repl[0].substr(0, repl[0].length - 2));
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
//# sourceMappingURL=calculatePath.js.map