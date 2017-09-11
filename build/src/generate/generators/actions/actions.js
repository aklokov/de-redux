"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
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
    for (let action of file.actions) {
        gen.indent = indent + '';
        _1.actionGenerator.generateContent(gen, action);
        gen.indent = indent;
        gen.forceEol();
    }
    gen.eol();
    gen.append('export const ');
    gen.append((file.stateName).toString());
    gen.append('Actions = [');
    gen.eol();
    for (let action of file.actions) {
        gen.append('  ');
        gen.append((action.constantName).toString());
        if (!__1.isLast(action, file.actions)) {
            gen.append(',');
        }
        gen.eol();
    }
    gen.append('];');
    gen.eol();
}
exports.actionsGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=actions.js.map