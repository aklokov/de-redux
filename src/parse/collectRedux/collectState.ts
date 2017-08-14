import { Model, State } from '../../model';
import * as fs from 'fs';
import { combinePath, readFile } from '..';
import { parseImports } from '.';
import { Options } from '../../Options';

export async function collectState(options: Options, path: string, file: string): Promise<Model> {
  const content = await readFile(combinePath(path, file));
  const imports = parseImports(options, content, path);
  return {
    reductions: [],
    states: []
  };
}
