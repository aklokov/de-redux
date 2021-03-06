// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------
import { ChildReducer, ReducerFile } from '../../../derive/model';

class Gen {
    public indent: string = '';
    private lines: string[] = [];
    private eolPrinted: boolean = true;

    public append(text: string): void {
        if (this.eolPrinted) { this.lines.push(this.indent); }
        this.lines.push(text);
        this.eolPrinted = false;
    }

    public eol(): void {
        if (this.eolPrinted) {
            return;
        }
        this.eolPrinted = true;
        this.lines.push('\n');
    }

    public forceEol(): void {
        this.eolPrinted = true;
        this.lines.push('\n');
    }

    public toString(): string {
        return this.lines.join('');
    }
}

function generate(child: ChildReducer, reducer: ReducerFile): string {
    const gen = new Gen();
    generateContent(gen, child, reducer);
    return gen.toString();
}

function generateContent(gen: any, child: ChildReducer, reducer: ReducerFile): void {
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
    gen.append((child.stateName).toString());
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
    gen.append((child.stateName).toString());
    gen.append('Reduceable) {');
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

export const childReducerGenerator = {
    generate,
    generateContent
};
