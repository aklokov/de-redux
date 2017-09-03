import { Import } from '.';

export interface DispatcherAction {
  name: string;
  actionName: string;
  parameters: string;
  fullParameters: string;
}

export interface DispatcherFile {
  dispatcherFile: string;
  unlink: boolean;

  canSubscribe: boolean;
  rootStateName: string;
  stateName: string;
  traceToRoot: string;
  imports: Import[];
  actions: DispatcherAction[];
}
