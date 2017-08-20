import { Type } from '../model';
import { StringMap } from 'hash-map';
import { Options } from '../../Options';
export interface FileInfo {
    importPath: string;
    file: string;
    content: string;
    imports: StringMap<Type>;
}
export declare function collectFileInfo(options: Options, path: string, file: string): Promise<FileInfo>;
