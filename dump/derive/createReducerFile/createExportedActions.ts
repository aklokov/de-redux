import { ChildReducer } from '../model';

export function createExportedActions(childReducers: ChildReducer[], needActions: boolean): string[] {
  const result = childReducers.map(child => child.fieldName + 'Actions');
  return needActions ? [...result, 'actions.allActions'] : result;
}
