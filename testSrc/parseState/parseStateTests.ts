import { PreparedFile } from '../../src/parse';
import { parseStateFile } from '../../src/parse/parseState';
import { expect } from 'chai';
import { checkState } from '.';

describe('parseState', function (): void {
  it('should parse simple state', async function (): Promise<void> {
    // arrange
    const file: PreparedFile = {
      filePath: './file1.state.ts',
      content: `
    export interface SomeState {
      n: number;
    }
`,
      imports: []
    };

    const expected = {
      id: './SomeState',
      name: 'SomeState',
      importPath: '.',
      folderPath: '.',
      fields: []
    };

    // act
    const result = parseStateFile(file);

    // assert
    expect(result.length).to.be.equal(1);
    checkState(result[0], expected);
  });
});
