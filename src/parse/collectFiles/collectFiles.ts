import { FileInfo, getFilesWithIsDir, getFolderFiles, normalizePath } from '.';
import { constants } from '../../constants';
import { toStringDict, StringMap } from 'hash-map';
import * as _ from 'lodash';

export async function collectFiles(path: string | string[]): Promise<FileInfo[]> {
  if (Array.isArray(path)) {
    const models = await Promise.all(path.map(collectFilesImpl));
    return _.flatten(models);
  }

  return await collectFilesImpl(path);
}

async function collectFilesImpl(path: string): Promise<FileInfo[]> {
  path = normalizePath(path);
  const allFiles = await getFilesWithIsDir(path);
  const folders = allFiles.filter(file => file.isDir).map(file => file.fullPath);
  const folderModels = await Promise.all(folders.map(collectFiles));
  const flat = _.flatten(folderModels);
  const thisModel = await getFolderFiles(allFiles.filter(file => !file.isDir));
  return [...flat, ...thisModel];
}
