export declare function readDir(path: string): Promise<string[]>;
export declare function mkdir(path: string): Promise<void>;
export declare function readFile(path: string): Promise<string>;
export declare function writeFile(path: string, content: string): Promise<string>;
export declare function gracefulWriteFile(path: string, content: string): Promise<boolean>;
export declare function isDirectory(path: string): Promise<boolean>;
export declare function exists(path: string): Promise<boolean>;
export declare function ensureFolder(path: string): Promise<void>;
