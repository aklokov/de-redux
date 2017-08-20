import { Type } from '../model';
import { StringMap } from 'hash-map';
import { Options } from '../../Options';
export declare function parseImports(options: Options, content: string, path: string): StringMap<Type>;
