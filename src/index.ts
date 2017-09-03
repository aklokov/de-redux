import { parseFiles } from './parse/parse';
import { Options } from './Options';
import { constants } from './constants';
export * from './Options';

export async function generate(options: Options): Promise<void> {
  options = {
    rootStateName: constants.defaultRootStateName,
    ...options
  };

  const parseModel = await parseFiles(options, options.path);

}


