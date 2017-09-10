import { FileInfo } from '../collectFiles';
import { State } from '../model';
import { getTempStates } from '.';
import { PreparedFile } from '..';

export function parseStateFile(file: PreparedFile): State[] {
  const tempStates = getTempStates(file.content);

  return [];
}
