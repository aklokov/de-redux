import * as changeCase from 'change-case';
import { combinePath } from '../tools';
import { constants } from '../constants';
import { Options } from '../Options';

export function createRootFilePath(options: Options): string {
  if (!options.generateRootIn) {
    return null;
  }

  const fileName = changeCase.paramCase(options.rootStateName) + constants.stateExt;
  return combinePath(options.generateRootIn, fileName);
}
