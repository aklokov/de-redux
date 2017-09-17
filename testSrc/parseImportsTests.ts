import { FileInfo } from '../src/parse/collectFiles';
import { parseImports, Import } from '../src/parse/parseImports';
import { expect } from 'chai';

describe('parseImports', function (): void {
  it('should return singular imports', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';

    const content = `
    import { Type1 } from '.';
    import { Type2 } from './';
`;
    const expected: Import[] = [
      { typeName: 'Type1', aliasName: 'Type1', importPath: './someDir/dir2' },
      { typeName: 'Type2', aliasName: 'Type2', importPath: './someDir/dir2' }
    ];

    // act
    const result = parseImports({}, content, path);

    // assert
    checkImports(result, expected);
  });

  it('should return multi imports', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';

    const content = `
    import { Type1, Type2 } from '.';
`;
    const expected: Import[] = [
      { typeName: 'Type1', aliasName: 'Type1', importPath: './someDir/dir2' },
      { typeName: 'Type2', aliasName: 'Type2', importPath: './someDir/dir2' }
    ];

    // act
    const result = parseImports({}, content, path);

    // assert
    checkImports(result, expected);
  });

  it('should return aliased imports', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';

    const content = `
    import { Type1 as Type2, Type3 } from '.';
`;
    const expected: Import[] = [
      { typeName: 'Type1', aliasName: 'Type2', importPath: './someDir/dir2' },
      { typeName: 'Type3', aliasName: 'Type3', importPath: './someDir/dir2' }
    ];

    // act
    const result = parseImports({}, content, path);

    // assert
    checkImports(result, expected);
  });

});

export function checkImports(imports: Import[], expected: Import[]): void {
  expect(imports).to.be.not.equal(undefined);
  expect(imports.length).to.be.equal(expected.length);
  for (let exp of expected) {
    const imp = imports.find(i => i.importPath === exp.importPath && i.typeName === exp.typeName);
    expect(imp).to.be.not.equal(undefined);
    expect(imp.aliasName).to.be.equal(exp.aliasName);
  }
}
