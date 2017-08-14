import { Type } from '../../model';
import { calculatePath } from '.';
import { combinePath } from '..';
import { Options } from '../../Options';

const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;

export function parseImports(options: Options, content: string, path: string): Type[] {
  let types: Type[] = [];
  let match = regex.exec(content);

  while (match) {
    types = [...types, ...parseMatch(options, match[1], match[2], path)];
    match = regex.exec(content);
  }
  return types;
}

function parseMatch(options: Options, types: string, importline: string, path: string): Type[] {
  const typenames = types.split(',');
  const resultPath = calculatePath(options, path, importline);
  return typenames.map(typename => createType(typename, resultPath));
}

function createType(name: string, path: string): Type {
  const resultName = name.trim();
  return {
    id: combinePath(path, resultName),
    name: resultName,
    path
  };
}
