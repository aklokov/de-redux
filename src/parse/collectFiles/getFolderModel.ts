import { CollectedModel, FileIsDir, getReexports, FileInfo } from '.';
import { constants } from '../../constants';
import { toStringDict, StringMap } from 'hash-map';
import { trimFilename, trimExtension, combinePath } from '../../tools';

export async function getFolderModel(files: FileIsDir[]): Promise<CollectedModel> {
  const reexports = await getReexports(files);
  const dict = toStringDict(reexports, s => s, s => true);
  const stateFiles = filterFiles(files, constants.stateExt);
  const reductionFiles = filterFiles(files, constants.reductionExt);
  return {
    states: getFiles(stateFiles, dict),
    reductions: getFiles(reductionFiles, dict)
  };
}

function filterFiles(files: FileIsDir[], suffix: string): FileIsDir[] {
  return files.filter(file => file.file.endsWith(suffix));
}

function getFiles(files: FileIsDir[], dict: StringMap<boolean>): FileInfo[] {
  return files.map(file => getFile(file, dict));
}

function getFile(file: FileIsDir, dict: StringMap<boolean>): FileInfo {
  const trimmed = trimExtension(file.file);
  const importPath = dict[trimmed] ? trimFilename(file.fullPath) : trimExtension(file.fullPath);
  return {
    filePath: file.fullPath,
    importPath
  };
}
