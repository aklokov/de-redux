import { execRegex } from '../../tools';

const reexportRegex = /export \* from '.\/([^\']*)'/g;
export function parseReexports(indexContent: string): string[] {
  const reexports = execRegex(reexportRegex, indexContent);
  return reexports.map(reex => reex[1]);
}
