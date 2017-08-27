import { Field, Type } from '../parse/model';
import { Import } from './model';
export declare function createFieldImports(path: string, fields: Field[]): Import[];
export declare function createTypeImports(path: string, types: Type[]): Import[];
