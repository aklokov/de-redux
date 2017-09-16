"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
function getTempStates(content) {
    return tools_1.execRegex(typeRegex, content)
        .map(match => ({ name: match[1], content: match[2] }));
}
exports.getTempStates = getTempStates;
//# sourceMappingURL=getTempStates.js.map