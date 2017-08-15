import { Type } from '../model';
import { calculatePath } from '.';
import { combinePath } from '..';
import { Options } from '../../Options';
import { StringMap, toStringMap, execRegex } from '../../tools';
import * as _ from 'lodash';

const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;

export function parseImports(options: Options, content: string, path: string): StringMap<Type> {
  const matches = execRegex(regex, content);
  const types = _.flatten(matches.map(match => parseMatch(options, match[1], match[2], path)));
  return toStringMap(types, type => type.name);
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
