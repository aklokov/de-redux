import { combinePath } from '..';
import { readFile } from '../../tools';

export function createFileImport(path: string, file: string): string {
  return combinePath(path, file.substr(0, file.length - 3));
}
