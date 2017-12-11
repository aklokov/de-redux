import { Type } from '../model';
import { Options } from '../../Options';
export interface FileInfo {
    importPath: string;
    folder: string;
    file: string;
    content: string;
    imports: Map<string, Type>;
}
export declare function collectFileInfo(options: Options, path: string, file: string): Promise<FileInfo>;
