import { Options } from '../Options';
import { FileInfo } from './collectFiles';
import { createRootFilePath } from '.';

export function filterStates(options: Options, files: FileInfo[]): FileInfo[] {
  const rootFilePath = createRootFilePath(options);
  return files.filter(file => file.filePath !== rootFilePath);
}
