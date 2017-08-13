import { Model, State, Path } from '../../model';
import * as fs from 'fs';
import { combinePath, readFile } from '..';
import { parseImports } from '.';

export async function collectState(path: string, file: string): Promise<Model> {
  const content = await readFile(combinePath(path, file));
  const imports = parseImports(content, path);
  return {
    reductions: [],
    states: []
  };
}
