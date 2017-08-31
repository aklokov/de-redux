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
function generate(child, reducer) {
    const gen = new Gen();
    generateContent(gen, child, reducer);
    return gen.toString();
}
function generateContent(gen, child, reducer) {
    const indent = gen.indent;
    gen.append('function ');
    gen.append((child.fieldName).toString());
    gen.append('Call(prev: ');
    gen.append((reducer.stateName).toString());
    gen.append(', action: { type: string }): ');
    gen.append((reducer.stateName).toString());
    gen.append(' {');
    gen.eol();
    gen.append('  return {');
    gen.eol();
    gen.append('    ...prev,');
    gen.eol();
    gen.append('    ');
    gen.append((child.fieldName).toString());
    gen.append(': ');
    gen.append((child.fieldName).toString());
    gen.append('Reducer(prev.');
    gen.append((child.fieldName).toString());
    gen.append(', action)');
    gen.eol();
    gen.append('  };');
    gen.eol();
    gen.append('}');
    gen.eol();
    gen.forceEol();
    gen.append('for (let action of ');
    gen.append((child.fieldName).toString());
    gen.append('Actions) {');
    gen.eol();
    gen.append('  const existing = map[action];');
    gen.eol();
    gen.append('  if (existing) {');
    gen.eol();
    gen.append('    map[action] = (prev, action) => ');
    gen.append((child.fieldName).toString());
    gen.append('Call(existing(prev, action), action);');
    gen.eol();
    gen.append('  } else {');
    gen.eol();
    gen.append('    map[action] = ');
    gen.append((child.fieldName).toString());
    gen.append('Call;');
    gen.eol();
    gen.append('  }');
    gen.eol();
    gen.append('}');
    gen.eol();
}
exports.childReducerGenerator = {
    generate,
    generateContent
};
//# sourceMappingURL=childReducer.js.map