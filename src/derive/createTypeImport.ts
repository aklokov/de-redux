import { Type } from '../parse/model';
import { createRelativePath } from '.';
import { Import } from './model';

export function createTypeImport(types: Type[], src: string): Import {
  const path = types[0].path;
  const names = types.map(type => type.name).join(', ');
  return {
    importLine: `{ ${names} }`,
    path: createRelativePath(path, src)
  };
}
