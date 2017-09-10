import { Model, State, Reduction } from './model';
import { Options } from '../Options';
import { collectFiles, FileInfo } from './collectFiles';
import { filterStates } from '.';
import { parseState } from './parseState';
import { parseReduction } from './parseReduction';
import * as fse from 'fs-extra';
import * as _ from 'lodash';

export async function parseFiles(options: Options, path: string | string[]): Promise<Model> {
  const filesModel = await collectFiles(path);
  const states = await Promise.all(filterStates(options, filesModel.states).map(getStates));
  const reductions = await Promise.all(filesModel.reductions.map(getReductions));
  return {
    states: _.flatten(states),
    reductions: _.flatten(reductions)
  };
}

async function getStates(file: FileInfo): Promise<State[]> {
  const content = await fse.readFile(file.filePath, 'utf8');
  return parseState(file, content);
}

async function getReductions(file: FileInfo): Promise<Reduction[]> {
  const content = await fse.readFile(file.filePath, 'utf8');
  return parseReduction(file, content);
}
