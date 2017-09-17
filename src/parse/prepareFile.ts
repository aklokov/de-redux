import { parseImports } from './parseImports';
import { Import } from './model';
import { Options } from '../Options';
import { trimFilename } from '../tools';
import * as fse from 'fs-extra';

export interface PreparedFile {
  filePath: string;
  content: string;
  imports: Import[];
}

export async function prepareFile(options: Options, filePath: string): Promise<PreparedFile> {
  const content = await fse.readFile(filePath, 'utf8');
  const imports = parseImports(options.tsconfig, content, trimFilename(filePath));
  return { filePath, content, imports };
}
