import { Reduction } from '../parse/model';
import { Import } from './model';
import { createFieldImports } from '.';
import * as _ from 'lodash';

export function createReductionImports(path: string, reductions: Reduction[]): Import[] {
  return createFieldImports(path, _.flatten(reductions.map(red => red.parameters.slice(1))));
}
