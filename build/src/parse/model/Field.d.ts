import { Type } from '.';
export interface Field {
    name: string;
    typename: string;
    imported: Type[];
}
