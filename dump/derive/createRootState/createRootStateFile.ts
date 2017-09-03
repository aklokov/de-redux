import { Tree } from '../tree';
import { RootStateFile } from '../model';
import { State } from '../../parse/model';
import { createFieldImports } from '..';
import { trimFilename } from '../../tools';
import { constants } from '../../constants';

export function createRootStateFile(tree: Tree): RootStateFile {
  const state = tree.rootState;
  const rootFile = state.path + '.ts';
  const path = trimFilename(state.path);

  const imports = createFieldImports(path, state.fields);
  return {
    rootStateFile: rootFile,
    state,
    imports
  };
}
