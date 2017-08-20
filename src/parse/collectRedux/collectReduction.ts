import { Options } from '../../Options';
import { parseImports } from '.';
import { execRegex, combinePath } from '../../tools';
import { State, Type, Field, Reduction } from '../model';
import { createField } from '.';
import { StringMap } from 'hash-map';

const funcRegex = /export function ([^\(]*)\(([^\)]*)\): ([^{]*)/g;
export function collectReduction(options: Options, path: string, file: string, content: string): Reduction[] {
  const imports = parseImports(options, content, path);
  const matches = execRegex(funcRegex, content);
  return matches.map(match => toReduction(path, match, imports)).filter(r => r);
}

function toReduction(path: string, match: string[], imports: StringMap<Type>): Reduction {
  const [content, name, args, returnTypeName] = match;
  const returnType = imports[returnTypeName.trim()];
  if (!returnType) {
    return null;
  }
  const parameters = parseParameters(args).map(parm => toField(parm, imports));
  if (parameters.length && parameters[0].typename !== returnType.name) {
    return null;
  }

  return {
    path,
    name: name.trim(),
    stateId: returnType.id,
    parameters: parameters
  };
}

function toField(parm: string, imports: StringMap<Type>): Field {
  const split = parm.split(':');
  return createField(split[0], split[1], imports);
}

function findParameterEnd(content: string, index: number): number {
  let angleBracketCount = 0;
  while (index < content.length) {
    if (content[index] === '<') {
      angleBracketCount++;
    }

    if (content[index] === '>' && angleBracketCount > 0) {
      angleBracketCount--;
    }

    if (content[index] === ',' && angleBracketCount === 0) {
      break;
    }

    index++;
  }
  return index;
}

function parseParameters(content: string): string[] {
  let index = 0;
  const result: string[] = [];
  while (index < content.length) {
    const end = findParameterEnd(content, index);
    const parameter = content.substr(index, end - index).trim();
    if (parameter.length) {
      result.push(parameter);
    }

    index = end + 1;
  }
  return result;
}
