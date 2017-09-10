export interface State {
  id: string;
  name: string;
  importPath: string;

  folderPath: string;
  fields: StateField[];
}

export interface StateField {
  typeName: string;
  importPath: string;

  fieldName: string;
  isArray: boolean; // to be used later
}
