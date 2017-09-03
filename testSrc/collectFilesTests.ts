import { collectFiles, FileInfo } from '../src/parse/collectFiles';
import { expect } from 'chai';

describe('collectFiles', function (): void {
  it('should collect files with imports', async function (): Promise<void> {
    // arrange
    const states: FileInfo[] = [
      {
        filePath: './testFolder/file1.state.ts',
        importPath: './testFolder'
      },
      {
        filePath: './testFolder/folder3/file1.state.ts',
        importPath: './testFolder/folder3/file1.state'
      }];
    const reductions: FileInfo[] = [{
      filePath: './testFolder/folder2/some.reduction.ts',
      importPath: './testFolder/folder2/some.reduction'
    }];

    // act
    const result = await collectFiles('./testFolder');

    // assert
    compareFiles(result.states, states);
    compareFiles(result.reductions, reductions);
  });
});

function compareFiles(files: FileInfo[], expected: FileInfo[]): void {
  expect(files.length).to.be.equal(expected.length);
  expected.forEach(exp => {
    const file = files.find(f => f.filePath === exp.filePath);
    expect(file).to.be.not.equal(undefined);
    expect(file.importPath).to.be.equal(exp.importPath);
  });
}
