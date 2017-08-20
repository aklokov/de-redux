import { ActionsFile, ReducerFile, DispatcherFile, RootStateFile } from '.';
export interface Model {
    rootState?: RootStateFile;
    actionFiles: ActionsFile[];
    reducerFiles: ReducerFile[];
    dispatcherFiles: DispatcherFile[];
}
