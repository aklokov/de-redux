"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createExportedActions(childReducers) {
    return childReducers.map(child => child.stateName + 'Reduceable');
}
exports.createExportedActions = createExportedActions;
//# sourceMappingURL=createExportedActions.js.map