import * as fse from 'fs-extra';
import { stringMap } from 'hash-map';
import { execRegex, combinePath } from '../tools';
import { constants } from '../constants';

const matchesMap = stringMap<string[]>();
const reexportRegex = /export \* from '.\/([^\']*)'/g;
export async function cachedReexports(path: string): Promise<string[]> {
  const existing = matchesMap[path];
  if (existing) {
    return existing;
  }

  const content = await fse.readFile(combinePath(path, constants.index), 'utf8');
  const matches = execRegex(reexportRegex, content).map(match => match[1]);
  matchesMap[path] = matches;
  return matches;
}
