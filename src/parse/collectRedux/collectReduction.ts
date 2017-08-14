import { Model } from '../../model';
import { combinePath, readFile } from '..';
import { Options } from '../../Options';

export async function collectReduction(options: Options, path: string, file: string): Promise<Model> {
  const content = await readFile(combinePath(path, file));
  return {
    reductions: [],
    states: []
  };
}
