import { Reduction } from '../../model';
import { combinePath, readFile } from '..';
import { Options } from '../../Options';
import { parseImports, createFileImport } from '.';
import { StringMap, toStringMap, execRegex } from '../../tools';
import { State, Type, Field } from '../../model';
import { createField } from '.';

export async function collectReduction(options: Options, path: string, file: string): Promise<Reduction[]> {
  const content = await readFile(combinePath(path, file));
  const imports = parseImports(options, content, path);
  return parseReductions(content, createFileImport(path, file), imports);
}

const funcRegex = /export function ([^\(]*)\(([^\)]*)\): ([^{]*)/g;
function parseReductions(content: string, path: string, imports: StringMap<Type>): Reduction[] {
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
