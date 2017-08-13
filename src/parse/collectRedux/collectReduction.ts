import { Model } from '../../model';
import { combinePath, readFile } from '..';

export async function collectReduction(path: string, file: string): Promise<Model> {
  const content = await readFile(combinePath(path, file));
  return {
    reductions: [],
    states: []
  };
}
