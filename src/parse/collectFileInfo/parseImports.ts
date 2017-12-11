import { Type } from '../model';
import { map } from 'maptools';
import { calculatePath, correctReexportPath } from '.';
import { Options } from '../../Options';
import { execRegex, combinePath, first } from '../../tools';
import * as _ from 'lodash';

const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
export async function parseImports(options: Options, content: string, path: string): Promise<Map<string, Type>> {
  const matches = execRegex(regex, content);
  const typeGroups = await Promise.all(matches.map(match => parseMatch(options, match[1], match[2], path)));
  const types = _.flatten(typeGroups);
  return map(types, type => type.name);
}

async function parseMatch(options: Options, types: string, importline: string, path: string): Promise<Type[]> {
  const typenames = types.split(',');
  const importPath = calculatePath(options, path, importline);
  const promises = typenames
    .map(t => t.trim())
    .map(typename => createExportedType(typename, importPath));
  const result = await Promise.all(promises);
  return result;
}

async function createExportedType(typename: string, path: string): Promise<Type> {
  typename = first(typename.split(' ').filter(s => s.length));
  const correctedPath = await correctReexportPath(path, typename);
  return createType(typename, correctedPath);
}

function createType(name: string, path: string): Type {
  return {
    id: combinePath(path, name),
    name,
    path
  };
}
