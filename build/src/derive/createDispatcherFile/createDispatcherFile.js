"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const constants_1 = require("../../constants");
function createDispatcherFile(state, reductions, actionsFile, tree) {
    const dispatcherFile = __1.createFilePath(state.folder, state.name, constants_1.constants.dispatcherFile);
    if (!reductions.length) {
        return createUnlink(dispatcherFile);
    }
    const node = tree.nodesById[state.id];
    const rootNode = tree.nodesById[node.rootId];
    const canSubscribe = node.parentIds.length < 2;
    return {
        dispatcherFile,
        unlink: false,
        canSubscribe,
        stateName: state.name,
        rootStateName: canSubscribe ? rootNode.state.name : null,
        traceToRoot: canSubscribe ? createTrace(node.traceToRoot) : null,
        imports: [],
        actions: []
    };
}
exports.createDispatcherFile = createDispatcherFile;
function createTrace(trace) {
    const join = trace.join('.');
    return join.length ? '.' + join : '';
}
function createUnlink(file) {
    return {
        dispatcherFile: file,
        unlink: true,
        canSubscribe: false,
        stateName: null,
        rootStateName: null,
        traceToRoot: null,
        imports: null,
        actions: null
    };
}
//# sourceMappingURL=createDispatcherFile.js.map