"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createActionsFile_1 = require("./createActionsFile");
const createReducerFile_1 = require("./createReducerFile");
const createDispatcherFile_1 = require("./createDispatcherFile");
const map_tools_1 = require("@vlr/map-tools");
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
    tree = Object.assign({}, tree_2.populateTraceToRoot(tree), { reductionMap: map_tools_1.lookup(input.reductions, red => red.stateId) });
    return createDerivedModel(states, tree);
}
exports.deriveModel = deriveModel;
function createDerivedModel(states, tree) {
    const actionFiles = states.map(state => createActionsFile_1.createActionFile(state, tree));
    const reducerFiles = states.map(state => createReducerFile_1.createReducerFile(state, tree));
    const dispatcherFiles = states.map(state => createDispatcherFile_1.createDispatcherFile(state, tree));
    const rootStateFile = tree.rootState && createRootState_1.createRootStateFile(tree);
    return {
        actionFiles,
        reducerFiles,
        dispatcherFiles,
        rootState: rootStateFile
    };
}
//# sourceMappingURL=deriveModel.js.map