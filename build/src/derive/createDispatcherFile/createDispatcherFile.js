"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const _1 = require(".");
const tools_1 = require("../../tools");
const __2 = require("..");
function createDispatcherFile(state, tree) {
    const dispatcherFile = __1.createDispatcherFileName(state);
    if (!__2.needDispatcherFile(state.id, tree)) {
        return createUnlink(dispatcherFile);
    }
    const reductions = tree.reductionMap.get(state.id) || [];
    const path = tools_1.trimFilename(dispatcherFile);
    if (__2.canSubscribe(state.id, tree)) {
        return createSubscribable();
    }
    else {
        return createUnsubscribable();
    }
    function createSubscribable() {
        const node = tree.nodesById.get(state.id);
        const root = tree.nodesById.get(node.rootId);
        const imports = _1.createImports(path, state, tree);
        const actions = reductions.filter(r => !__1.isInit(r)).map(red => _1.createDispatcherAction(red));
        return {
            dispatcherFile,
            unlink: false,
            canSubscribe: true,
            stateName: state.name,
            rootStateName: root.state.name,
            traceToRoot: createTrace(node.traceToRoot),
            imports,
            actions
        };
    }
    function createUnsubscribable() {
        const imports = _1.createImports(path, state, tree);
        const actions = reductions.filter(r => !__1.isInit(r)).map(red => _1.createDispatcherAction(red));
        return {
            dispatcherFile,
            unlink: false,
            canSubscribe: false,
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
    return trace.join('.');
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