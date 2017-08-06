export interface IImport {
    type: string;
    path: string;
}

export interface IAction {

}

export interface Actions {
    imports: IImport[];
    actions: IAction[];
}