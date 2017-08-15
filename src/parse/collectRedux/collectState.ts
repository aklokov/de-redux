import { combinePath, readFile } from '..';
import { parseImports, createFileImport } from '.';
import { Options } from '../../Options';
import { StringMap, toStringMap, execRegex } from '../../tools';
import { State, Type, Field } from '../../model';
import { createField } from '.';

export async function collectState(options: Options, path: string, file: string): Promise<State[]> {
  const content = await readFile(combinePath(path, file));
  const imports = parseImports(options, content, path);
  return parseStates(content, createFileImport(path, file), imports);
}

const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
function parseStates(content: string, path: string, imports: StringMap<Type>): State[] {
  const matches = execRegex(typeRegex, content);
  const tempStates = matches.map(match => createTempState(path, match[1], match[2]));
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


