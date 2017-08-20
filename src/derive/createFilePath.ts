import * as changeCase from 'change-case';

export function createFilePath(path: string, name: string, suffix: string): string {
  const kebabName = changeCase.paramCase(name);
  return `${path}/gen/${kebabName}${suffix}.ts`;
}
