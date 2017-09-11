import { ChildReducer } from '../model';

export function createExportedActions(childReducers: ChildReducer[]): string[] {
  return childReducers.map(child => child.stateName + 'Reduceable');
}
