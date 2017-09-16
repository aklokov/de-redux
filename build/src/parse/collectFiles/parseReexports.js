"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const reexportRegex = /export \* from '.\/([^\']*)'/g;
function parseReexports(indexContent) {
    const reexports = tools_1.execRegex(reexportRegex, indexContent);
    return reexports.map(reex => reex[1]);
}
exports.parseReexports = parseReexports;
//# sourceMappingURL=parseReexports.js.map