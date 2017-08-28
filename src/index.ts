import { parseFiles } from './parse/parse';
import { Options } from './Options';
import { constants } from './constants';
export * from './Options';
import { deriveModel } from './derive/deriveModel';
import { generateFiles } from './generate/generate';

export async function generate(options: Options): Promise<void> {
  options = {
    rootStateName: constants.defaultRootStateName,
    ...options
  };

  const parseModel = await parseFiles(options, options.path);
  const derive = deriveModel(options, parseModel);
  await generateFiles(options, derive);
}


