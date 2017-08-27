import { Action } from '../../../derive/model';
export declare const actionGenerator: {
    generate: (action: Action) => string;
    generateContent: (gen: any, action: Action) => void;
};
