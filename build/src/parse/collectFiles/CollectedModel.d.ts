export interface FileInfo {
    filePath: string;
    type: FileType;
    reexported: boolean;
}
export declare enum FileType {
    State = "State",
    Reduction = "Reduction",
}
