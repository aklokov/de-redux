export interface FileInfo {
  filePath: string;
  type: FileType;
}

export enum FileType {
  State= 'State',
  Reduction = 'Reduction'
}
