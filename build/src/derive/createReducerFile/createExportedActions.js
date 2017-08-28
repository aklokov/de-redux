"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createExportedActions(childReducers, needActions) {
    const result = childReducers.map(child => child.fieldName + 'Actions');
    return needActions ? [...result, 'actions.allActions'] : result;
}
exports.createExportedActions = createExportedActions;
//# sourceMappingURL=createExportedActions.js.map