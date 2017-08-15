import { Model } from './model';
import * as _ from 'lodash';

export function mergeModels(models: Model[]): Model {
    const reductions = _.flatten(models.map(model => model.reductions));
    const states = _.flatten(models.map(model => model.states));
    return {
        reductions,
        states
    };
}
