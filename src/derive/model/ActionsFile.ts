import { Import } from '.';
import { Field } from '../../parse/model';

export interface Action {
  constantName: string;
  constantContent: string;
  name: string;
  parameters: string;
}

export interface ActionsFile {
  actionsFile: string;
  actions: Action[];
  imports: Import[];
}
