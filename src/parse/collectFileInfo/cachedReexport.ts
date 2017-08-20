import * as fse from 'fs-extra';
import { execRegex, combinePath, cachedPromise } from '../../tools';
import { constants } from '../../constants';

const reexportRegex = /export \* from '.\/([^\']*)'/g;
async function getReexports(path: string): Promise<string[]> {
  const content = await fse.readFile(combinePath(path, constants.index), 'utf8');
  return execRegex(reexportRegex, content).map(match => match[1]);
}

export const cachedReexports = cachedPromise(getReexports);
