export interface Parameter {
    name: string;
    imported: boolean;
    typename?: string;
    typeId: string;
}

export interface Reduction {
    name: string;
    stateId: string;
    parameters: Parameter[];
}
