export interface FileIsDir {
    file: string;
    fullPath: string;
    isDir: boolean;
}
export declare function getFilesWithIsDir(path: string): Promise<FileIsDir[]>;
