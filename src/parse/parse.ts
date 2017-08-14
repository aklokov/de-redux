import { Model } from '../model';
import * as fs from 'fs';
import { combinePath, isFolder, readDir, readFile, mergeModels } from '.';
import { collectRedux } from './collectRedux';
import { Options } from '../Options';
const redux = 'redux';
export async function collectModel(options: Options, path: string): Promise<Model> {
  const allFiles = await readDir(path);
  const folders = allFiles.filter(file => isFolder(file, path));
  const models = await Promise.all(folders.map(file => collectModelIn(options, path, file)));
  return mergeModels(models);
}

async function collectModelIn(options: Options, path: string, file: string): Promise<Model> {
  const newPath = combinePath(path, file);
  const dirPromise = collectModel(options, newPath);
  if (file === redux) {
    const reduxPromise = collectRedux(options, newPath);
    const models = await Promise.all([dirPromise, reduxPromise]);
    return mergeModels(models);
  } else {
    return dirPromise;
  }
}
