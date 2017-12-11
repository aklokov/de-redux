export type promisedFunc<T> = (key: string) => Promise<T>;

export function cachedPromise<T>(func: promisedFunc<T>): promisedFunc<T> {
  const map = new Map<string, T>();
  return async function (key: string): Promise<T> {
    const existing = map.get(key);
    if (existing !== undefined) {
      return existing;
    }

    const result = await func(key);
    map.set(key, result);
    return result;
  };
}
