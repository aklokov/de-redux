export declare enum Quotes {
    single = "single",
    double = "double",
}
export interface Options {
    path: string | string[];
    tsconfig?: any;
    generateRootIn?: string;
    rootStateName?: string;
}
