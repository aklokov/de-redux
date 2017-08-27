import { DispatcherAction, DispatcherFile } from '../../../derive/model';
export declare const dispatcherActionGenerator: {
    generate: (action: DispatcherAction, file: DispatcherFile) => string;
    generateContent: (gen: any, action: DispatcherAction, file: DispatcherFile) => void;
};
