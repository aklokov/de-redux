import { Field, Type } from '../parse/model';
import { Import } from './model';
import * as _ from 'lodash';
import { createTypeImport } from '.';
import { trimFilename, splitInGroups } from '../tools';

export function createFieldImports(path: string, fields: Field[]): Import[] {
  const types = _.flatten(fields.map(field => field.imported));
  return createTypeImports(path, types);
}

export function createTypeImports(path: string, types: Type[]): Import[] {
  const unique = _.uniqBy(types, imp => imp.id);
  const grouped = _.groupBy(unique, un => un.path);
  let result = [];
  _.forIn(grouped, grp => {
    const groups = splitInGroups(grp, 5).map(grp => createTypeImport(grp, path));
    result = [...result, ...groups];
  });

  return result;
}
