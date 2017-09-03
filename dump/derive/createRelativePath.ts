import { trimFilename, trimExtension } from '../tools';

export function createRelativePath(path: string, src: string): string {
  let pathSplit = path.split('/');
  let srcSplit = src.split('/');
  while (pathSplit.length && srcSplit.length && pathSplit[0] === srcSplit[0]) {
    pathSplit = pathSplit.slice(1);
    srcSplit = srcSplit.slice(1);
  }

  const resultSplit = [...srcSplit.map(s => '..'), ...pathSplit];
  const result = resultSplit.join('/');
  if (!result.length) {
    return '.';
  }

  return result.startsWith('.') ? result : './';
}

export function createRelativePathToFile(file: string, src: string): string {
  const path = trimFilename(file);
  const filename = trimExtension(file.substr(file.lastIndexOf('/')));
  return createRelativePath(path, src) + filename;
}
