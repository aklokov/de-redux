"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse/parse");
const constants_1 = require("./constants");
__export(require("./Options"));
function generate(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = Object.assign({ rootStateName: constants_1.constants.defaultRootStateName }, options);
        const parseModel = yield parse_1.parseFiles(options, options.path);
    });
}
exports.generate = generate;
//# sourceMappingURL=index.js.map