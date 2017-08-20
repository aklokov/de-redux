import { Type } from '../model';
import { StringMap } from 'hash-map';
import { createFileImport, parseImports } from '.';
import { combinePath } from '../../tools';
import * as fse from 'fs-extra';
import { Options } from '../../Options';

export interface FileInfo {
  importPath: string;
  file: string;
  content: string;
  imports: StringMap<Type>;
}

async function read(path: string, file: string): Promise<string> {
  return fse.readFile(combinePath(path, file), 'utf8');
}

export async function collectFileInfo(options: Options, path: string, file: string): Promise<FileInfo> {
  const content = await read(path, file);
  const importPath = await createFileImport(path, file);
  const imports = await parseImports(options, content, path);
  return {
    importPath,
    file,
    content,
    imports
  };
}
