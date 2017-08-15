import { combinePath } from './';
import * as fs from 'fs';

export function isDirectory(path: string, file: string): boolean {
  return fs.lstatSync(combinePath(path, file)).isDirectory();
}
