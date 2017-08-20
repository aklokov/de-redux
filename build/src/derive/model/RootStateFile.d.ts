import { Import } from '.';
export interface ChildState {
    name: string;
    typeName: string;
}
export interface RootStateFile {
    rootStateFile: string;
    imports: Import[];
    name: string;
    childStates: ChildState[];
}
