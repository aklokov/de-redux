export interface FileInfo {
  filePath: string;
  type: FileType;
  reexported: boolean;
}

export enum FileType {
  State = 'State',
  Reduction = 'Reduction'
}
