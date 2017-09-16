import { Import } from './parseImports';
import { Options } from '../Options';
export interface PreparedFile {
    filePath: string;
    content: string;
    imports: Import[];
}
export declare function prepareFile(options: Options, filePath: string): Promise<PreparedFile>;
