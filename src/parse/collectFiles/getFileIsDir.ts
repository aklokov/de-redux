import { isDirectory, combinePath } from '../../tools';
import * as fse from 'fs-extra';

export interface FileIsDir {
  file: string;
  fullPath: string;
  isDir: boolean;
}

export async function getFilesWithIsDir(path: string): Promise<FileIsDir[]> {
  const files = await fse.readdir(path);
  const results = await Promise.all(files.map(file => getFileIsDir(path, file)));
  return results;
}

async function getFileIsDir(path: string, file: string): Promise<FileIsDir> {
  const fullPath = combinePath(path, file);
  const isDir = await isDirectory(fullPath);
  return {
    file,
    fullPath,
    isDir
  };
}
