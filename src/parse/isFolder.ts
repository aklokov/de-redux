import { combinePath } from './';
import * as fs from 'fs';

export function isFolder(file: string, path: string): boolean {
    return fs.lstatSync(combinePath(path, file)).isDirectory();
}
