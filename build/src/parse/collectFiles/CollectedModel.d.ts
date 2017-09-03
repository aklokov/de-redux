export interface CollectedModel {
    states: FileInfo[];
    reductions: FileInfo[];
}
export interface FileInfo {
    filePath: string;
    importPath: string;
}
