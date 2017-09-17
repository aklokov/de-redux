import { Import } from '.';
export interface Reduction {
    name: string;
    importPath: string;
    stateId: string;
    imports: Import[];
    parameters: Parameter[];
}
export interface Parameter {
    name: string;
    typeName: string;
    optional: boolean;
}
