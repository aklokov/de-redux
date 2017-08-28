"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createActionsFile_1 = require("./createActionsFile");
const createReducerFile_1 = require("./createReducerFile");
const createDispatcherFile_1 = require("./createDispatcherFile");
const hash_map_1 = require("hash-map");
const tree_1 = require("./tree");
const tree_2 = require("./tree");
const createRootState_1 = require("./createRootState");
function deriveModel(options, input) {
    let tree = tree_1.createTree(options, input.states);
    let states = input.states;
    if (options.generateRootIn) {
        tree = tree_2.createRootState(tree, options.generateRootIn, options.rootStateName);
        states = [...states, tree.rootState];
    }
    tree = Object.assign({}, tree_2.populateTraceToRoot(tree), { reductionMap: hash_map_1.toStringLookup(input.reductions, red => red.stateId, hash_map_1.ds) });
    return createDerivedModel(states, tree);
}
exports.deriveModel = deriveModel;
function createDerivedModel(states, tree) {
    const actionFiles = [];
    const reducerFiles = [];
    const dispatcherFiles = [];
    states.forEach(state => {
        const actionFile = createActionsFile_1.createActionFile(state, tree);
        actionFiles.push(actionFile);
        reducerFiles.push(createReducerFile_1.createReducerFile(state, actionFile, tree));
        dispatcherFiles.push(createDispatcherFile_1.createDispatcherFile(state, actionFile, tree));
    });
    const rootStateFile = tree.rootState && createRootState_1.createRootStateFile(tree);
    return {
        actionFiles,
        reducerFiles,
        dispatcherFiles,
        rootState: rootStateFile
    };
}
//# sourceMappingURL=deriveModel.js.map