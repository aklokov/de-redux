import * as fse from 'fs-extra';

export async function isDirectory(path: string): Promise<boolean> {
  const stats = await fse.lstat(path);
  return stats.isDirectory();
}
