import { FileInfo } from '../../src/parse/collectFiles';
import { parseImports, Import } from '../../src/parse/parseImports';
import { expect } from 'chai';
import { checkImports } from '.';

describe('parseImports', function (): void {
  it('should return imports from same directory', async function (): Promise<void> {
    // arrange
    const content = `
    import { Type1 } from '.';
    import { Type2 } from './';
`;
    const expected: Import[] = [
      { typename: 'Type1', importPath: './someDir/dir2' },
      { typename: 'Type2', importPath: './someDir/dir2' }
    ];

    // act
    const result = parseImports({}, content);

    // assert
    checkImports(result, expected);
  });

  it('should return imports from same root directory', async function (): Promise<void> {
    // arrange
    const content = `
    import { Type1 } from '.';
    import { Type2 } from './';
`;
    const expected: Import[] = [
      { typename: 'Type1', importPath: '.' },
      { typename: 'Type2', importPath: '.' }
    ];

    // act
    const result = parseImports({}, content);

    // assert
    checkImports(result, expected);
  });

  it('should return imports from sub directory or neighbour file', async function (): Promise<void> {
    // arrange
    const content = `
    import { Type1 } from './child';
`;
    const expected: Import[] = [
      { typename: 'Type1', importPath: './parent/child' }
    ];

    // act
    const result = parseImports({}, content);

    // assert
    checkImports(result, expected);
  });

  it('should return imports from parent directory', async function (): Promise<void> {
    // arrange
    const content = `
    import { Type1 } from '..';
    import { Type2 } from '../';
`;
    const expected: Import[] = [
      { typename: 'Type1', importPath: './parent' },
      { typename: 'Type2', importPath: './parent' }
    ];

    // act
    const result = parseImports({}, content);

    // assert
    checkImports(result, expected);
  });

  it('should return imports from neighbour directory or parent file', async function (): Promise<void> {
    // arrange
    const content = `
    import { Type1 } from '../neighbour';
`;
    const expected: Import[] = [
      { typename: 'Type1', importPath: './parent/neighbour' }
    ];

    // act
    const result = parseImports({}, content);

    // assert
    checkImports(result, expected);
  });

  it('should return imports from outside root', async function (): Promise<void> {
    // arrange
    const content = `
    import { Type1 } from '../../otherPath';
`;
    const expected: Import[] = [
      { typename: 'Type1', importPath: '../otherPath' }
    ];

    // act
    const result = parseImports({}, content);

    // assert
    checkImports(result, expected);
  });
});
