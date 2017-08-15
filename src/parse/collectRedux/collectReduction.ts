import { Reduction } from '../../model';
import { combinePath, readFile } from '..';
import { Options } from '../../Options';

export async function collectReduction(options: Options, path: string, file: string): Promise<Reduction[]> {
  const content = await readFile(combinePath(path, file));
  return [];
}
