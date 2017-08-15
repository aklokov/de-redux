import { DefaultSelectionsState } from './default-selections.state';
import { IHierarchySelection } from '@mdminterfaces/data-preferences';

export function init(): DefaultSelectionsState {
  return {
    dataLoaded: false,
    hierarchies: []
  };
}

export function loadedDefaultsHierarchy(prev: DefaultSelectionsState, hierarchies: IHierarchySelection[]): DefaultSelectionsState {
  return {
    ...prev,
    hierarchies: hierarchies
  };
}
