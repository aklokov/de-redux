import { FileIsDir, parseReexports } from '.';
import * as fse from 'fs-extra';
import { constants } from '../../constants';

export async function getReexports(files: FileIsDir[]): Promise<string[]> {
  const index = files.find(file => !file.isDir && (file.file === constants.index));
  return !index ? [] : parseReexports(await fse.readFile(index.fullPath, 'utf8'));
}
