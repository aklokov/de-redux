export interface State {
  id: string;
  name: string;
  realPath: string;

  folderPath: string;
  fields: StateField[];
}

export interface StateField {
  typeName: string;
  realPath: string;

  fieldName: string;
  isOptional: boolean;
  isArray: boolean;
}
