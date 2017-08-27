"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createActionsFile_1 = require("./createActionsFile");
const createReducerFile_1 = require("./createReducerFile");
const hash_map_1 = require("hash-map");
const tree_1 = require("./tree");
const tree_2 = require("./tree");
function deriveModel(options, input) {
    let tree = tree_1.createTree(options, input.states);
    let states = input.states;
    if (options.generateRootIn) {
        tree = tree_2.createRootState(tree, options.generateRootIn, options.rootStateName);
        states = [...states, tree.rootState];
    }
    tree = tree_2.populateTraceToRoot(tree);
    const reductionMap = hash_map_1.toStringLookup(input.reductions, red => red.stateId, hash_map_1.ds);
    return createDerivedModel(states, reductionMap, tree);
}
exports.deriveModel = deriveModel;
function createDerivedModel(states, reductionMap, tree) {
    const actionFiles = [];
    const reducerFiles = [];
    const dispatcherFiles = [];
    states.forEach(state => {
        const actionFile = createActionsFile_1.createActionFile(state, reductionMap[state.id] || []);
        actionFiles.push(actionFile);
        reducerFiles.push(createReducerFile_1.createReducerFile(state, reductionMap[state.id] || [], actionFile, tree));
    });
    return {
        actionFiles,
        reducerFiles,
        dispatcherFiles
    };
}
//# sourceMappingURL=deriveModel.js.map