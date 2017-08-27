import { Import } from './model';
import { createRelativePathToFile } from '.';

export function createActionsImport(path: string, actions: string): Import {
  return {
    importLine: '* as actions',
    path: createRelativePathToFile(actions, path)
  };
}
