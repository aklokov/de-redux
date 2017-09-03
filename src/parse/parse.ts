import { Model, State, Reduction } from './model';
import { Options } from '../Options';
import { collectFiles, FileInfo } from './collectFiles';
import { filterStates } from '.';
import { parseState } from './parseState';
import { parseReduction } from './parseReduction';
import * as fse from 'fs-extra';

export async function parseFiles(options: Options, path: string | string[]): Promise<Model> {
  const filesModel = await collectFiles(path);
  const states = await Promise.all(filterStates(options, filesModel.states).map(getState));
  const reductions = await Promise.all(filesModel.reductions.map(getReduction));
  return {
    states,
    reductions
  };
}

async function getState(file: FileInfo): Promise<State> {
  const content = await fse.readFile(file.filePath, 'utf8');
  return parseState(file, content);
}

async function getReduction(file: FileInfo): Promise<Reduction> {
  const content = await fse.readFile(file.filePath, 'utf8');
  return parseReduction(file, content);
}
