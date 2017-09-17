import { expect } from 'chai';
import { State, StateField } from '../../src/parse/model';

export function checkState(state: State, expected: State): void {
  expect(state).to.not.be.equal(undefined);
  expect(state.id).to.be.equal(expected.id);
  expect(state.name).to.be.equal(expected.name);
  expect(state.realPath).to.be.equal(expected.realPath);
  expect(state.folderPath).to.be.equal(expected.folderPath);
  expect(state.fields).to.not.be.equal(undefined);
  expect(state.fields.length).to.be.equal(expected.fields.length);
  for (let expField of expected.fields) {
    const stateField = state.fields.find(sf => sf.fieldName === expField.fieldName);
    checkField(expField, stateField);
  }
}

function checkField(field: StateField, expected: StateField): void {
  expect(field).to.be.not.equal(undefined);
  expect(field.fieldName).to.be.equal(expected.fieldName);
  expect(field.realPath).to.be.equal(expected.realPath);
  expect(field.isOptional).to.be.equal(expected.isOptional);
  expect(field.isArray).to.be.equal(expected.isArray);
  expect(field.typeName).to.be.equal(expected.typeName);
}
