"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const _1 = require(".");
function deriveModel(options, input) {
    const reductionMap = _.groupBy(input.reductions, red => red.stateId);
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