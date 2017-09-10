import { FileInfo } from '../../src/parse/collectFiles';
import { parseStateFile } from '../../src/parse/parseState';
import { expect } from 'chai';
import { checkState } from '.';

describe('parseState', function (): void {
  it('should parse simple state', async function (): Promise<void> {
    // arrange
    const fileInfo: FileInfo = {
      filePath: './file1.state.ts',
      importPath: '.'
    };

    const content = `
    export interface SomeState {
      n: number;
    }
`;
    const expected = {
      id: './SomeState',
      name: 'SomeState',
      importPath: '.',
      folderPath: '.',
      fields: []
    };

    // act
    const result = parseStateFile(fileInfo, content);

    // assert
    expect(result.length).to.be.equal(1);
    checkState(result[0], expected);
  });
});
