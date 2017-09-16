import { Options } from '../Options';
import { createRootFilePath } from '.';
import { FileInfo, FileType } from './collectFiles';

export function getStates(options: Options, files: FileInfo[]): string[] {
  const rootFilePath = createRootFilePath(options);
  const filtered = getFilePathsByType(files, FileType.State);
  return filtered.filter(file => file !== rootFilePath);
}

export function getReductions(files: FileInfo[]): string[] {
  return getFilePathsByType(files, FileType.Reduction);
}

function getFilePathsByType(files: FileInfo[], type: FileType): string[] {
  return files.filter(file => file.type === type).map(file => file.filePath);
}
