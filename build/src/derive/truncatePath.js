"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function truncatePath(path) {
    const split = path.split('/');
    return split.slice(0, split.length - 1).join('/');
}
exports.truncatePath = truncatePath;
//# sourceMappingURL=truncatePath.js.map