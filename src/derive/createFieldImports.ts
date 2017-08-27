import { Field, Type } from '../parse/model';
import { Import } from './model';
import * as _ from 'lodash';
import { createTypeImport } from '.';
import { trimFilename } from '../tools';

export function createFieldImports(path: string, fields: Field[]): Import[] {
  const imported = _.flatten(fields.map(field => field.imported));
  const unique = _.uniqBy(imported, imp => imp.id);
  const grouped = _.groupBy(unique, un => un.path);
  const result = [];
  _.forIn(grouped, grp => {
    result.push(createTypeImport(grp, path));
  });

  return result;
}
