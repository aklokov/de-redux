import { Type } from '../model';
import { StringMap, toStringMap } from 'hash-map';
import { calculatePath, correctReexportPath } from '.';
import { Options } from '../../Options';
import { execRegex, combinePath } from '../../tools';
import * as _ from 'lodash';

const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
export async function parseImports(options: Options, content: string, path: string): Promise<StringMap<Type>> {
  const matches = execRegex(regex, content);
  const typeGroups = await Promise.all(matches.map(match => parseMatch(options, match[1], match[2], path)));
  const types = _.flatten(typeGroups);
  return toStringMap(types, type => type.name);
}

async function parseMatch(options: Options, types: string, importline: string, path: string): Promise<Type[]> {
  const typenames = types.split(',');
  const importPath = calculatePath(options, path, importline);
  const resultPath = await correctReexportPath(path);
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
