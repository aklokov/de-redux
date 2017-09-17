import { collectFiles, FileInfo, FileType } from '../src/parse/collectFiles';
import { expect } from 'chai';

describe('collectFiles', function (): void {
  it('should collect files with imports', async function (): Promise<void> {
    // arrange
    const files: FileInfo[] = [
      {
        filePath: './testFolder/file1.state.ts',
        type: FileType.State,
        reexported: true
      },
      {
        filePath: './testFolder/folder3/file1.state.ts',
        type: FileType.State,
        reexported: false
      },
      {
        filePath: './testFolder/folder2/some.reduction.ts',
        type: FileType.Reduction,
        reexported: false
      }];

    // act
    const result = await collectFiles('./testFolder');

    // assert
    compareFiles(result, files);
  });
});

function compareFiles(files: FileInfo[], expected: FileInfo[]): void {
  expect(files.length).to.be.equal(expected.length);
  expected.forEach(exp => {
    const file = files.find(f => f.filePath === exp.filePath);
    expect(file).to.be.not.equal(undefined);
    expect(file.type).to.be.equal(exp.type);
  });
}
