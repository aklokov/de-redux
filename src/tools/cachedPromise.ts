import { stringMap } from 'hash-map';

export type promisedFunc<T> = (key: string) => Promise<T>;

export function cachedPromise<T>(func: promisedFunc<T>): promisedFunc<T> {
  const map = stringMap<T>();
  return async function (key: string): Promise<T> {
    const existing = map[key];
    if (existing !== undefined) {
      return existing;
    }

    const result = await func(key);
    map[key] = result;
    return result;
  };
}
