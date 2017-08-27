import { ChildReducer, ReducerFile } from '../../derive/model';
export declare const childReducerGenerator: {
    generate: (child: ChildReducer, reducer: ReducerFile) => string;
    generateContent: (gen: any, child: ChildReducer, reducer: ReducerFile) => void;
};
