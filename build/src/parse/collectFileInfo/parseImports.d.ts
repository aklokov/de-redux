import { Type } from '../model';
import { Options } from '../../Options';
export declare function parseImports(options: Options, content: string, path: string): Promise<Map<string, Type>>;
