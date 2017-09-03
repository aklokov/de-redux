import { parseReexports } from '../src/parse/collectFiles';
import { expect } from 'chai';

describe('parseReexports', function (): void {
  it('should return reexported file names', async function (): Promise<void> {
    // arrange
    const index = `
    export * from './someFile1';
    export * from './someFile2'
export * from './someFile3';
    `;
    const expected = ['someFile1', 'someFile2', 'someFile3'];

    // act
    const result = parseReexports(index);

    // assert
    expect(result).to.be.deep.equal(expected);
  });

});
