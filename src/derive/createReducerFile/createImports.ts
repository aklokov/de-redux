import { State, Reduction, Field, Type } from '../../parse/model';
import { Tree } from '../tree';
import { Import } from '../model';
import * as _ from 'lodash';
import { createRelativePath } from '..';
import { trimFilename } from '../../tools';

export function createImports(state: State, reductions: Reduction[], tree: Tree): Import[] {

}