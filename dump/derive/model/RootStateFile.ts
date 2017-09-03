import { Import } from '.';
import { State } from '../../parse/model';

export interface RootStateFile {
  rootStateFile: string;
  state: State;
  imports: Import[];
}
