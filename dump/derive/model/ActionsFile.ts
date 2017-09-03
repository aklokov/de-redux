import { Import } from '.';
import { Field } from '../../parse/model';

export interface Action {
  constantName: string;
  constantContent: string;
  name: string;
  parameters: string;
  noConstructor: boolean;
}

export interface ActionsFile {
  actionsFile: string;
  unlink: boolean;
  actions: Action[];
  imports: Import[];
}
