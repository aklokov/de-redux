import { isFunction } from '.';
import { StringMap, NumberMap } from '.';
import * as _ from 'lodash';
export type selector<TKey, TItem> = ((item: TItem) => TKey);

export function toStringMap<TItem>(items: TItem[], selector: string | selector<string, TItem>): StringMap<TItem> {
  const s: selector<string, TItem> = isFunction(selector) ? <selector<string, TItem>>selector : item => item[<string>selector];
  const result: StringMap<TItem> = {};
  items.forEach(item => result[s(item)] = item);
  return result;
}

export function toNumberMap<TItem>(items: TItem[], selector: string | selector<number, TItem>): NumberMap<TItem> {
  const s: selector<string, TItem> = isFunction(selector) ? <selector<number, TItem>>selector : item => item[<string>selector];
  const result: NumberMap<TItem> = {};
  items.forEach(item => result[s(item)] = item);
  return result;
}
