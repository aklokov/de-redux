import { cachedReexports } from '.';
import { contains, combinePath, trimExtension } from '../tools';

export async function hasReexport(path: string, filename: string): Promise<boolean> {
  const matches = await cachedReexports(path);
  return contains(matches, filename);
}

export async function createFileImport(path: string, file: string): Promise<string> {
  const filename = trimExtension(file);
  const reexported = await hasReexport(path, file);
  if (reexported) {
    return path;
  }

  return combinePath(path, filename);
}
