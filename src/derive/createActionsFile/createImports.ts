import { Field, Type } from '../../parse/model';
import { Import } from '../model';
import * as _ from 'lodash';
import { createRelativePath } from '..';
import { trimFilename } from '../../tools';

export function createImports(path: string, fields: Field[]): Import[] {
  const src = trimFilename(path);
  const imported = _.flatten(fields.map(field => field.imported));
  const unique = _.uniqBy(imported, imp => imp.id);
  const grouped = _.groupBy(unique, un => un.path);
  const result = [];
  _.forIn(grouped, (grp, path) => {
    result.push(createImport(grp, path, src));
  });

  return result;
}

function createImport(types: Type[], path: string, src: string): Import {
  const names = types.map(type => type.name).join(', ');
  return {
    types: names,
    path: createRelativePath(path, src)
  };
}
