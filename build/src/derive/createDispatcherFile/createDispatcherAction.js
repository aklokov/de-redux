"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createDispatcherAction(reduction) {
    const actionName = __1.createActionName(reduction);
    const params = reduction.parameters.slice(1);
    const parameters = params.map(parm => parm.name).join(', ');
    const fullParameters = params.map(parm => `${parm.name}: ${parm.typename}`).join(', ');
    return {
        name: reduction.name,
        actionName: actionName.actionName,
        parameters,
        fullParameters
    };
}
exports.createDispatcherAction = createDispatcherAction;
//# sourceMappingURL=createDispatcherAction.js.map