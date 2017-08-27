"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitInGroups(items, by) {
    const result = [];
    let i = 0;
    while (i < items.length) {
        const next = i + by;
        result.push(items.slice(i, next));
        i = next;
    }
    return result;
}
exports.splitInGroups = splitInGroups;
//# sourceMappingURL=splitInGroups.js.map