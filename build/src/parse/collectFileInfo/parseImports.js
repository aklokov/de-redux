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
const hash_map_1 = require("hash-map");
const _1 = require(".");
const tools_1 = require("../../tools");
const _ = require("lodash");
const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
function parseImports(options, content, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const matches = tools_1.execRegex(regex, content);
        const typeGroups = yield Promise.all(matches.map(match => parseMatch(options, match[1], match[2], path)));
        const types = _.flatten(typeGroups);
        return hash_map_1.toStringMap(types, type => type.name);
    });
}
exports.parseImports = parseImports;
function parseMatch(options, types, importline, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const typenames = types.split(',');
        const importPath = _1.calculatePath(options, path, importline);
        const promises = typenames
            .map(t => t.trim())
            .map(typename => createExportedType(typename, importPath));
        const result = yield Promise.all(promises);
        return result;
    });
}
function createExportedType(typename, path) {
    return __awaiter(this, void 0, void 0, function* () {
        typename = tools_1.first(typename.split(' ').filter(s => s.length));
        const correctedPath = yield _1.correctReexportPath(path, typename);
        return createType(typename, correctedPath);
    });
}
function createType(name, path) {
    return {
        id: tools_1.combinePath(path, name),
        name,
        path
    };
}
//# sourceMappingURL=parseImports.js.map