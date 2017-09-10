import { parseImports, Import } from './parseImports';
import { FileInfo } from './collectFiles';
import { Options } from '../Options';
import * as fse from 'fs-extra';

export interface PreparedFile extends FileInfo {
  content: string;
  imports: Import[];
}

export async function prepareFile(options: Options, file: FileInfo): Promise<PreparedFile> {
  const content = await fse.readFile(file.filePath, 'utf8');
  const imports = parseImports(options.tsconfig, content);
  return { ...file, content, imports };
}
