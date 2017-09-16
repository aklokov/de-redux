export interface FileInfo {
    filePath: string;
    type: FileType;
}
export declare enum FileType {
    State = "State",
    Reduction = "Reduction",
}
