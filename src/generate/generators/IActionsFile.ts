export interface IImport {
    types: string;
    path: string;
}

export interface IAction {
    typeName: string;
    typeContent: string;
    name: string;
    parameters: string;
}

export interface IActionsFile {
    imports: IImport[];
    actions: IAction[];
}
