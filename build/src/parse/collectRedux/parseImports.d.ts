import { Type } from '../model';
import { Options } from '../../Options';
import { StringMap } from 'hash-map';
export declare function parseImports(options: Options, content: string, path: string): StringMap<Type>;
