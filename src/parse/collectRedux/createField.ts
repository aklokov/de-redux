import { execRegex } from '../../tools';
import { State, Type, Field } from '../model';

function trimQuestionMark(name: string): string {
  const trimmed = name.trim();
  if (trimmed.endsWith('?')) {
    return trimmed.substr(0, trimmed.length - 1);
  }
  return trimmed;
}

export function createField(name: string, typename: string, imports: Map<string, Type>): Field {
  const split = typename.replace(/[\[|\]|\s]/g, '').split(/[<|>]/);
  return {
    name: trimQuestionMark(name),
    typename: typename.trim(),
    imported: split.map(type => imports.get(type.trim())).filter(type => type)
  };
}

