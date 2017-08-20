export interface ChildReducer {
    field: string;
    reducerFile: string;
    actionsFile: string;
}
export interface ReducerFile {
    actionsFile: string;
    reducerFile: string;
    childReducers: ChildReducer[];
}
