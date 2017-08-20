import { combinePath } from '../../tools';
import { parseImports } from '.';
import { Options } from '../../Options';
import { execRegex } from '../../tools';
import { State, Type, Field } from '../model';
import { createField } from '.';
import { toStringMap, StringMap } from 'hash-map';

const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
export function collectState(options: Options, importPath: string, file: string, content: string): State[] {
  const imports = parseImports(options, content, importPath);
  const matches = execRegex(typeRegex, content);
  const tempStates = matches.map(match => createTempState(importPath, match[1], match[2]));
  const fullImports = {
    ...imports,
    ...toStringMap(tempStates, ts => ts.name)
  };

  return tempStates.map(ts => toState(ts, fullImports));
}

interface TempState extends Type {
  content: string;
}

function createTempState(path: string, name: string, content: string): TempState {
  return {
    id: combinePath(path, name),
    name: name,
    path: path,
    content: content
  };
}

const fieldRegex = /(.*):([^;]*);?/g;
function toState(ts: TempState, imports: StringMap<Type>): State {
  const matches = execRegex(fieldRegex, ts.content);
  return {
    id: ts.id,
    name: ts.name,
    path: ts.path,
    fields: matches.map(match => createField(match[1], match[2], imports))
  };
}


