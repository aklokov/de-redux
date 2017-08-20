import * as fse from 'fs-extra';
import { cachedPromise } from '.';

export async function isDirectory(path: string): Promise<boolean> {
  const stats = await fse.lstat(path);
  return stats.isDirectory();
}

export const cachedIsDirectory = cachedPromise(isDirectory);
