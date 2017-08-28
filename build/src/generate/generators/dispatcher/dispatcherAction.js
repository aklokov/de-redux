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
function generate(action) {
    const gen = new Gen();
    generateContent(gen, action);
    return gen.toString();
}
function generateContent(gen, action) {
    const indent = gen.indent;
    gen.append((action.name).toString());
    gen.append('(');
    gen.append((action.fullParameters).toString());
    gen.append('): void {');
    gen.eol();
    gen.append('  this.service.dispatch(new actions.');
    gen.append((action.actionName).toString());
    gen.append('(');
    gen.append((action.parameters).toString());
    gen.append('));');
    gen.eol();
    gen.append('}');
    gen.eol();
}
exports.dispatcherActionGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=dispatcherAction.js.map