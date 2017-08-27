import { Reduction } from '../parse/model';
export interface IActionName {
    constantName: string;
    actionName: string;
}
export declare function createActionName(reduction: Reduction): IActionName;
