"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function mergeModels(models) {
    const reductions = _.flatten(models.map(model => model.reductions));
    const states = _.flatten(models.map(model => model.states));
    return {
        reductions,
        states
    };
}
exports.mergeModels = mergeModels;
//# sourceMappingURL=mergeModels.js.map