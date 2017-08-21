import { Import } from '../../derive/model';
export declare const importsGenerator: {
    generate: (imports: Import[]) => string;
    generateContent: (gen: any, imports: Import[]) => void;
};
