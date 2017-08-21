import { Import } from '.';
export interface Action {
    constantName: string;
    constantContent: string;
    name: string;
    parameters: string;
    noConstructor: boolean;
}
export interface ActionsFile {
    actionsFile: string;
    actions: Action[];
    imports: Import[];
}
