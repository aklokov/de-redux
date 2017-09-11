import { isDirectory, combinePath, trimExtension, contains } from '../../tools';
import { hasReexport } from '.';
import * as fse from 'fs-extra';
import { getExportedNames } from 'typescript-reexport-generator';

export async function correctReexportPath(path: string, type: string): Promise<string> {
  const isDir = await isDirectory(path);
  if (!isDir) {
    return path;
  }

  const files = await fse.readdir(path);
  for (let file of files) {
    if (file === 'index.ts' || !file.endsWith('.ts')) {
      continue;
    }

    const filePath = combinePath(path, file);
    if (await isDirectory(filePath)) {
      continue;
    }

    const content = await fse.readFile(combinePath(path, file), 'utf8');
    if (typeIsExported(content, type)) {
      return combinePath(path, trimExtension(file));
    }
  }

  throw new Error('type ' + type + ' export is not found in ' + path);
}

function typeIsExported(content: string, type: string): boolean {
  const names = getExportedNames(content);
  return contains(names, type);
}
