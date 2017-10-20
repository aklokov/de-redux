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
    gen.eol();
    gen.append('export interface I');
    gen.append((file.stateName).toString());
    gen.append('ReduxService {');
    gen.eol();
    gen.append('  dispatch: (action: { type: string; }) => void;');
    gen.eol();
    if (file.canSubscribe) {
        gen.append('  getState: () => ');
        gen.append((file.rootStateName).toString());
        gen.append(';');
        gen.eol();
        gen.append('  subscribe: (subscription: (state: ');
        gen.append((file.rootStateName).toString());
        gen.append(') => void) => void;');
        gen.eol();
    }
    gen.append('}');
    gen.eol();
    if (file.canSubscribe && !!file.traceToRoot.length) {
        gen.forceEol();
        gen.append('function selector(state: ');
        gen.append((file.rootStateName).toString());
        gen.append('): ');
        gen.append((file.stateName).toString());
        gen.append(' {');
        gen.eol();
        gen.append('  return state.');
        gen.append((file.traceToRoot).toString());
        gen.append(';');
        gen.eol();
        gen.append('}');
        gen.eol();
    }
    gen.forceEol();
    gen.append('export class ');
    gen.append((file.stateName).toString());
    gen.append('Dispatcher {');
    gen.eol();
    gen.append('  constructor(private service: I');
    gen.append((file.stateName).toString());
    gen.append('ReduxService) {');
    gen.eol();
    gen.append('  }');
    gen.eol();
    if (file.canSubscribe) {
        if (!!file.traceToRoot.length) {
            gen.indent = indent + '  ';
            _1.selectorSubscribeGenerator.generateContent(gen, file);
            gen.indent = indent;
            gen.eol();
        }
        else {
            gen.indent = indent + '  ';
            _1.directSubscribeGenerator.generateContent(gen, file);
            gen.indent = indent;
            gen.eol();
        }
    }
    for (let action of file.actions) {
        gen.forceEol();
        gen.indent = indent + '  ';
        _1.dispatcherActionGenerator.generateContent(gen, action);
        gen.indent = indent;
        gen.eol();
    }
    gen.append('}');
}
exports.dispatcherGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=dispatcher.js.map