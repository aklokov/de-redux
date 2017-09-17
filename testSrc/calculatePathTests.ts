
import { calculatePath } from '../src/parse/parseImports';
import { expect } from 'chai';
import { checkImports } from '.';

describe('calculatePath', function (): void {
  it('should return same directory', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = '.';
    const expected = './someDir/dir2';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return same directory when slashed', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = './';
    const expected = './someDir/dir2';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return same directory from root', async function (): Promise<void> {
    // arrange
    const path = '.';
    const importPath = '.';
    const expected = '.';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return imports from sub directory or neighbour file', async function (): Promise<void> {
    // arrange
    const path = './parent';
    const importPath = './child';
    const expected = './parent/child';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return imports from parent directory', async function (): Promise<void> {
    // arrange
    const path = './parent/child';
    const importPath = '..';
    const expected = './parent';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return imports from neighbour directory or parent file', async function (): Promise<void> {
    // arrange
    const path = './parent/child';

    const importPath = '../neighbour';
    const expected = './parent/neighbour';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return imports from outside root', async function (): Promise<void> {
    // arrange
    const path = './parent';

    const importPath = '../../otherPath';
    const expected = '../otherPath';

    // act
    const result = calculatePath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });
});
