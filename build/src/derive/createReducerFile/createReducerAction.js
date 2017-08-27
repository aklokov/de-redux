"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createReducerAction(reduction) {
    const actionName = __1.createActionName(reduction);
    const fields = ['prev', ...reduction.parameters.slice(1).map(parm => `a.${parm.name}`)];
    const reductionLine = `${reduction.name}(${fields.join(', ')})`;
    return {
        constantName: actionName.constantName,
        name: actionName.actionName,
        reductionLine
    };
}
exports.createReducerAction = createReducerAction;
//# sourceMappingURL=createReducerAction.js.map