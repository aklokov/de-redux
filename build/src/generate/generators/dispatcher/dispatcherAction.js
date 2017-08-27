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
function generate(action, file) {
    const gen = new Gen();
    generateContent(gen, action, file);
    return gen.toString();
}
function generateContent(gen, action, file) {
    const indent = gen.indent;
}
exports.dispatcherActionGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=dispatcherAction.js.map