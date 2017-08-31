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
    gen.append('map[actions.');
    gen.append((action.constantName).toString());
    gen.append('] = function(prev: ');
    gen.append((file.stateName).toString());
    gen.append(', action: { type: string }): ');
    gen.append((file.stateName).toString());
    gen.append(' {');
    gen.eol();
    gen.append('  const a = action as actions.');
    gen.append((action.name).toString());
    gen.append(';');
    gen.eol();
    gen.append('  return ');
    gen.append((action.reductionLine).toString());
    gen.append(';');
    gen.eol();
    gen.append('}');
    gen.eol();
}
exports.reducerActionGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=reducerAction.js.map