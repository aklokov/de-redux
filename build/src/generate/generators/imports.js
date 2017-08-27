"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function generate(imports) {
    const gen = new Gen();
    generateContent(gen, imports);
    return gen.toString();
}
function generateContent(gen, imports) {
    const indent = gen.indent;
    for (let imp of imports) {
        gen.append('import ');
        gen.append((imp.importLine).toString());
        gen.append(' from \'');
        gen.append((imp.path).toString());
        gen.append('\';');
        gen.eol();
    }
    gen.forceEol();
}
exports.importsGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=imports.js.map