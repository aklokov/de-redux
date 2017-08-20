import { cachedIsDirectory, trimExtension } from '../../tools';
import { hasReexport } from '.';

export async function correctReexportPath(path: string): Promise<string> {
  const isDir = await cachedIsDirectory(path);
  if (isDir) {
    return path;
  }

  const index = path.lastIndexOf('/');
  const filename = trimExtension(path.substr(index + 1));
  const dir = path.substr(0, index);
  const reexport = await hasReexport(path, filename);
  return reexport ? dir : path;
}
