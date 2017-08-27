"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const _1 = require(".");
class Gen {
    constructor() {
        this.indent = '';
        this.lines = [];
        this.eolPrinted = true;
    }
    append(text) {
        if (this.eolPrinted) {
            this.lines.push(this.indent);
        }
        this.lines.push(text);
        this.eolPrinted = false;
    }
    eol() {
        if (this.eolPrinted) {
            return;
        }
        this.eolPrinted = true;
        this.lines.push('\n');
    }
    forceEol() {
        this.eolPrinted = true;
        this.lines.push('\n');
    }
    toString() {
        return this.lines.join('');
    }
}
function generate(file) {
    const gen = new Gen();
    generateContent(gen, file);
    return gen.toString();
}
function generateContent(gen, file) {
    const indent = gen.indent;
    gen.indent = indent + '';
    __1.disclaimer.generateContent(gen);
    gen.indent = indent;
    gen.eol();
    gen.indent = indent + '';
    __1.importsGenerator.generateContent(gen, file.imports);
    gen.indent = indent;
    gen.eol();
    gen.append('export type IAction =  { type: string };');
    gen.eol();
    gen.forceEol();
    gen.append('type actor = (prev: ');
    gen.append((file.stateName).toString());
    gen.append(', action: IAction) => ');
    gen.append((file.stateName).toString());
    gen.append(';');
    gen.eol();
    gen.append('const map = stringMap<actor>();');
    gen.eol();
    for (let child of file.childReducers) {
        gen.forceEol();
        gen.indent = indent + '';
        _1.childReducerGenerator.generateContent(gen, child, file);
        gen.indent = indent;
        gen.eol();
    }
    for (let action of file.actions) {
        gen.forceEol();
        gen.indent = indent + '';
        _1.reducerActionGenerator.generateContent(gen, action, file);
        gen.indent = indent;
        gen.eol();
    }
    gen.forceEol();
    gen.append('export function reducer(prev: ');
    gen.append((file.stateName).toString());
    gen.append(' = init(), action: IAction): ');
    gen.append((file.stateName).toString());
    gen.append(' {');
    gen.eol();
    gen.append('  const specificReducer = map[action.type];');
    gen.eol();
    gen.append('  return (specificReducer && specificReducer(prev, action)) || prev;');
    gen.eol();
    gen.append('}');
    gen.eol();
    gen.forceEol();
    gen.append('export const allActions = actions.allActions;');
    gen.eol();
}
exports.reducerGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=reducer.js.map