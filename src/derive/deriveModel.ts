import { Model } from './model';
import { Model as InputModel, Reduction } from '../parse/model';
import { Options } from '../Options';
import * as _ from 'lodash';
import { createActionFile } from '.';
import { toStringLookup } from 'hash-map';
export function deriveModel(options: Options, input: InputModel): Model {
  const reductionMap = toStringLookup(input.reductions, red => red.stateId);
  const actionFiles = input.states
    .map(state => createActionFile(state, reductionMap[state.id]));

  return {
    actionFiles,
    reducerFiles: [],
    dispatcherFiles: []
  };
}

