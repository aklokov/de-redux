export interface State {
    id: string;
    name: string;
    importPath: string;
    folderPath: string;
    fields: StateField[];
}
export interface StateField {
    id: string;
    typeName: string;
    importPath: string;
    fieldName: string;
    isArray: boolean;
}
