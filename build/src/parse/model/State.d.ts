import { Type, Field } from './';
export interface State extends Type {
    folder: string;
    fields: Field[];
}
