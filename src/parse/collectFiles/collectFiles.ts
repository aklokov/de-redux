import { CollectedModel, getFilesWithIsDir, mergeModels, getFolderModel, normalizePath } from '.';
import { constants } from '../../constants';
import { toStringDict, StringMap } from 'hash-map';

export async function collectFiles(path: string | string[]): Promise<CollectedModel> {
  if (Array.isArray(path)) {
    const models = await Promise.all(path.map(collectFilesImpl));
    return mergeModels(models);
  }

  return await collectFilesImpl(path);
}

async function collectFilesImpl(path: string): Promise<CollectedModel> {
  path = normalizePath(path);
  const allFiles = await getFilesWithIsDir(path);
  const folders = allFiles.filter(file => file.isDir).map(file => file.fullPath);
  const folderModels = await Promise.all(folders.map(collectFiles));
  const thisModel = await getFolderModel(allFiles.filter(file => !file.isDir));
  return mergeModels([...folderModels, thisModel]);
}
