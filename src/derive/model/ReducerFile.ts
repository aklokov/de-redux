import { Import } from '.';

export interface ChildReducer {
  field: string;
  reducerFile: string;
  actionsFile: string;
}

export interface ReducerFile {
  actionsFile: string;
  reducerFile: string;
  unlink: boolean;
  childReducers: ChildReducer[];
}
