"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const constants_1 = require("../../constants");
const _1 = require(".");
const tools_1 = require("../../tools");
const __2 = require("..");
function createDispatcherFile(state, actionsFile, tree) {
    const dispatcherFile = __1.createFilePath(state.folder, state.name, constants_1.constants.dispatcherFile);
    if (!__2.needDispatcherFile(state.id, tree)) {
        return createUnlink(dispatcherFile);
    }
    const reductions = tree.reductionMap[state.id] || [];
    const path = tools_1.trimFilename(dispatcherFile);
    const node = tree.nodesById[state.id];
    const canSubscribe = node.parentIds.length < 2;
    if (canSubscribe) {
        return createSubscribable();
    }
    else {
        return createUnsubscribable();
    }
    function createSubscribable() {
        const root = tree.nodesById[node.rootId];
        const imports = _1.createFullImports(path, actionsFile.actionsFile, reductions, state, root.state);
        const actions = reductions.filter(r => !__1.isInit(r)).map(red => _1.createDispatcherAction(red));
        return {
            dispatcherFile,
            unlink: false,
            canSubscribe,
            stateName: state.name,
            rootStateName: root.state.name,
            traceToRoot: createTrace(node.traceToRoot),
            imports,
            actions
        };
    }
    function createUnsubscribable() {
        const imports = _1.createImports(path, actionsFile.actionsFile, reductions, state);
        const actions = reductions.map(red => _1.createDispatcherAction(red));
        return {
            dispatcherFile,
            unlink: false,
            canSubscribe,
            stateName: state.name,
            rootStateName: null,
            traceToRoot: null,
            imports,
            actions
        };
    }
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