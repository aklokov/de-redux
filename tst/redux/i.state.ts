import { IDataset } from '@mdminterfaces/data-preferences';

export interface DatasetSelectorState {
  datasetsLoaded: boolean;
  datasets?: IDataset[];
  selectedDataset?: IDataset;
}
