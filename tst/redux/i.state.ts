import { IDataset } from '@mdminterfaces/data-preferences';
import { IDataTable } from '..\data-preferences\table';
import { Map } from '../tools/map';

export interface DatasetSelectorState {
  datasetsLoaded: boolean;
  datasets?: IDataset[];
  selectedDataset?: IDataset;
}

export interface DataInfoState {
  selector: DatasetSelectorState;
  datasets: Map<IDataset[]>;
  table?: IDataTable;
}
