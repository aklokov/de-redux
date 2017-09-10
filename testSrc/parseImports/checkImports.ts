import { Import } from '../../src/parse/parseImports';
import { expect } from 'chai';

export function checkImports(imports: Import[], expected: Import[]): void {
  expect(imports).to.be.not.equal(undefined);
  expect(imports.length).to.be.equal(expected.length);
  for (let exp of expected) {
    const imp = imports.find(i => i.importPath === exp.importPath && i.typename === exp.typename);
    expect(imp).to.be.not.equal(undefined);
  }
}
