import { Type, Field } from '../model';
import { StringMap } from 'hash-map';
export declare function createField(name: string, typename: string, imports: StringMap<Type>): Field;
