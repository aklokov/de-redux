"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
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
    const reductionMap = hash_map_1.toStringLookup(input.reductions, red => red.stateId);
    const actionFiles = states.map(state => _1.createActionFile(state, reductionMap[state.id]));
    const reducers = states.map(state => _1.createReducerFile(state, reductionMap[state.id]));
    return {
        actionFiles,
        reducerFiles: [],
        dispatcherFiles: []
    };
}
exports.deriveModel = deriveModel;
//# sourceMappingURL=deriveModel.js.map