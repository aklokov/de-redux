import { ReducerAction, ReducerFile } from '../../derive/model';
export declare const reducerActionGenerator: {
    generate: (action: ReducerAction, file: ReducerFile) => string;
    generateContent: (gen: any, action: ReducerAction, file: ReducerFile) => void;
};
