import { FileInfo } from '../collectFiles';
import { execRegex } from '../../tools';

export interface TempState {
  name: string;
  content: string;
}

const typeRegex = /export interface (.*) {\r?\n((?:.*?|\r?\n)*?)}/g;
export function getTempStates(content: string): TempState[] {
  return execRegex(typeRegex, content)
    .map(match => ({ name: match[1], content: match[2] }));
}
