"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
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
    gen.append('export interface ');
    gen.append((file.state.name).toString());
    gen.append(' {');
    gen.eol();
    for (let field of file.state.fields) {
        gen.append('  ');
        gen.append((field.name).toString());
        gen.append(': ');
        gen.append((field.typename).toString());
        gen.append(';');
        gen.eol();
    }
    gen.append('}');
    gen.eol();
}
exports.rootStateGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=rootState.js.map