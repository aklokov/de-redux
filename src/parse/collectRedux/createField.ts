import { execRegex } from '../../tools';
import { State, Type, Field } from '../model';
import { StringMap } from 'hash-map';

export function createField(name: string, typename: string, imports: StringMap<Type>): Field {
  const split = typename.replace(/[\[|\]|\s]/g, '').split(/[<|>]/);
  return {
    name: name.trim(),
    typename: typename.trim(),
    imported: split.map(type => imports[type.trim()]).filter(type => type)
  };
}

