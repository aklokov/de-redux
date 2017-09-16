import { FileIsDir, getReexports, FileInfo, FileType } from '.';
import { constants } from '../../constants';
import { toStringDict, StringMap } from 'hash-map';
import { trimFilename, trimExtension, combinePath } from '../../tools';

export async function getFolderFiles(files: FileIsDir[]): Promise<FileInfo[]> {
  return files.map(getFile).filter(file => file);
}

function getFile(file: FileIsDir): FileInfo {
  if (file.file.length > constants.stateExt.length && file.file.endsWith(constants.stateExt)) {
    return { filePath: file.fullPath, type: FileType.State };
  }
  if (file.file.length > constants.reductionExt.length && file.file.endsWith(constants.reductionExt)) {
    return { filePath: file.fullPath, type: FileType.Reduction };
  }

  return null;
}
