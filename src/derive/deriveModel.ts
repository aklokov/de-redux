import { Model } from './model';
import { Model as InputModel } from '../parse/model';
import { Options } from '../Options';

export function deriveModel(options: Options, input: InputModel): Model {
  return {
    actionFiles: [],
    reducerFiles: [],
    dispatcherFiles: []
  };
}