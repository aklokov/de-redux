"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const hash_map_1 = require("hash-map");
function deriveModel(options, input) {
    const reductionMap = hash_map_1.toStringLookup(input.reductions, red => red.stateId);
    const actionFiles = input.states
        .filter(state => reductionMap[state.id])
        .map(state => _1.createActionFile(state, reductionMap[state.id]));
    return {
        actionFiles,
        reducerFiles: [],
        dispatcherFiles: []
    };
}
exports.deriveModel = deriveModel;
//# sourceMappingURL=deriveModel.js.map