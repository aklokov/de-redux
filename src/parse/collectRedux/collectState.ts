import { combinePath } from '../../tools';
import { Options } from '../../Options';
import { execRegex } from '../../tools';
import { State, Type, Field } from '../model';
import { createField } from '.';
import { toStringMap, StringMap } from 'hash-map';
import { FileInfo } from '../collectFileInfo';

const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
export function collectState(options: Options, fileInfo: FileInfo): State[] {
  const matches = execRegex(typeRegex, fileInfo.content);
  const tempStates = matches.map(match => createTempState(fileInfo.folder, fileInfo.importPath, match[1], match[2]));
  const fullImports = {
    ...fileInfo.imports,
    ...toStringMap(tempStates, ts => ts.name)
  };

  return tempStates.map(ts => toState(ts, fullImports));
}

interface TempState extends Type {
  folder: string;
  content: string;
}

function createTempState(folder: string, importPath: string, name: string, content: string): TempState {
  return {
    id: combinePath(importPath, name),
    folder,
    name: name,
    path: importPath,
    content: content
  };
}

const fieldRegex = /(.*):([^;]*);?/g;
function toState(ts: TempState, imports: StringMap<Type>): State {
  const matches = execRegex(fieldRegex, ts.content);
  return {
    id: ts.id,
    folder: ts.folder,
    name: ts.name,
    path: ts.path,
    fields: matches.map(match => createField(match[1], match[2], imports))
  };
}


