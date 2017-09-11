import { Import } from '.';
export interface ReducerAction {
    name: string;
    constantName: string;
    reductionLine: string;
}
export interface ChildReducer {
    fieldName: string;
    stateName: string;
    path: string;
}
export interface InitField {
    field: string;
    stateName: string;
    isNull: boolean;
}
export interface ReducerFile {
    reducerFile: string;
    unlink: boolean;
    imports: Import[];
    stateName: string;
    actions: ReducerAction[];
    childReducers: ChildReducer[];
    exportedActions: string[];
    initFields: InitField[];
}
