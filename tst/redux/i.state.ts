import { IDataset } from '@mdminterfaces/data-preferences';
import { IDataTable } from '..\data-preferences\table';

export interface DatasetSelectorState {
  datasetsLoaded: boolean;
  datasets?: IDataset[];
  selectedDataset?: IDataset;
}
