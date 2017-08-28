"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function needActionsFile(id, tree) {
    return !!tree.reductionMap[id];
}
exports.needActionsFile = needActionsFile;
function needReducerFile(id, tree) {
    return !!tree.reductionMap[id] || !!tree.nodesById[id].children.length;
}
exports.needReducerFile = needReducerFile;
function needDispatcherFile(id, tree) {
    return !!tree.reductionMap[id];
}
exports.needDispatcherFile = needDispatcherFile;
//# sourceMappingURL=needFile.js.map