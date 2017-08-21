import { Options } from '../../Options';
import * as _ from 'lodash';
import { last, combinePath } from '../../tools';

export function calculatePath(options: Options, path: string, importLine: string): string {
  const splitPath = path.split('/');
  const splitImport = importLine.replace(/\\/g, '/').split('/');
  if (splitImport[0] !== '.' && splitImport[0] !== '..') {
    return applyPath(options, splitImport);
  }

  return calculateDiff(splitPath, splitImport);
}

function applyPath(options: Options, split: string[]): string {
  split[0] = tryReplace(options, split[0]);
  return split.join('/');
}

function tryReplace(options: Options, first: string): string {
  const pathstart: string = options.tsconfig.baseUrl;
  let result = first;
  _.forIn(options.tsconfig.paths, (repl, path) => {
    if (path === first) {
      result = combinePath(pathstart, repl[0]);
    } else if (path === first + '/*') {
      result = combinePath(pathstart, repl[0].substr(0, repl[0].length - 2));
    }
  });

  return result;
}

function calculateDiff(path: string[], imp: string[]): string {
  imp.forEach(line => {
    if (line === '..') {
      path = subtractPath(path);
    } else if (line !== '.') {
      path = [...path, line];
    }
  });
  return path.join('/');
}

function subtractPath(path: string[]): string[] {
  const lastLine = last(path);
  if (lastLine === '.') {
    const lastRemoved = path.slice(0, path.length - 1);
    return [...lastRemoved, '..'];
  } else if (lastLine === '..') {
    return [...path, '..'];
  } else {
    return path.slice(0, path.length - 1);
  }
}
