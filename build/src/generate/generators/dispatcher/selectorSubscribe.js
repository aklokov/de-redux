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
function generate(file) {
    const gen = new Gen();
    generateContent(gen, file);
    return gen.toString();
}
function generateContent(gen, file) {
    const indent = gen.indent;
    gen.forceEol();
    gen.append('getState(): ');
    gen.append((file.stateName).toString());
    gen.append(' {');
    gen.eol();
    gen.append('  return selector(this.service.getState());');
    gen.eol();
    gen.append('}');
    gen.eol();
    gen.forceEol();
    gen.append('subscribe(subscription: (state: ');
    gen.append((file.stateName).toString());
    gen.append(') => void): void {');
    gen.eol();
    gen.append('  this.service.subscribe(state => subscription(selector(state)));');
    gen.eol();
    gen.append('}');
}
exports.selectorSubscribeGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=selectorSubscribe.js.map