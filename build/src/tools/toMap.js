"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function toStringMap(items, selector) {
    const s = _1.isFunction(selector) ? selector : item => item[selector];
    const result = {};
    items.forEach(item => result[s(item)] = item);
    return result;
}
exports.toStringMap = toStringMap;
function toNumberMap(items, selector) {
    const s = _1.isFunction(selector) ? selector : item => item[selector];
    const result = {};
    items.forEach(item => result[s(item)] = item);
    return result;
}
exports.toNumberMap = toNumberMap;
//# sourceMappingURL=toMap.js.map