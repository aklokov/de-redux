import { FileIsDir, getReexports, FileInfo, FileType } from '.';
import { constants } from '../../constants';
import { toStringDict, StringMap } from 'hash-map';
import { trimFilename, trimExtension, combinePath } from '../../tools';

export async function getFolderFiles(files: FileIsDir[]): Promise<FileInfo[]> {
  const hasFiles = files.map(file => getFileType(file.file)).some(file => !!file);
  if (!hasFiles) {
    return [];
  }

  const reexports = await getReexports(files);
  const map = toStringDict(reexports, r => r, r => true);
  return files.map(file => getFile(file, isReexported(file.file, map))).filter(file => file);
}

function getFile(file: FileIsDir, reexported: boolean): FileInfo {
  const type = getFileType(file.file);
  if (!type) {
    return null;
  }

  return { filePath: file.fullPath, type, reexported };
}

function isReexported(file: string, map: StringMap<boolean>): boolean {
  const filename = file.substr(file.lastIndexOf('/') + 1);
  const withoutExt = trimExtension(filename);
  return !!map[file];
}

function getFileType(file: string): FileType {
  if (fileIs(file, constants.stateExt)) {
    return FileType.State;
  } else if (fileIs(file, constants.reductionExt)) {
    return FileType.Reduction;
  }
  return null;
}

function fileIs(file: string, suffix: string): boolean {
  return file.length > suffix.length && file.endsWith(suffix);
}
