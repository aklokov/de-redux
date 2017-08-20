import { Model } from './model';
import { Model as InputModel, Reduction } from '../parse/model';
import { Options } from '../Options';
import * as _ from 'lodash';
import { createActionFile } from '.';

export function deriveModel(options: Options, input: InputModel): Model {
  const reductionMap = _.groupBy(input.reductions, red => red.stateId);
  const actionFiles = input.states
    .filter(state => reductionMap[state.id])
    .map(state => createActionFile(state, reductionMap[state.id]));

  return {
    actionFiles,
    reducerFiles: [],
    dispatcherFiles: []
  };
}

