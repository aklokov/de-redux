import * as changeCase from 'change-case';
import { truncatePath } from '.';

export function createFilePath(path: string, name: string, suffix: string): string {
  const kebabName = changeCase.paramCase(name);
  return `${truncatePath(path)}/gen/${kebabName}${suffix}.ts`;
}
