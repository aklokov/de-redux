export declare type promisedFunc<T> = (key: string) => Promise<T>;
export declare function cachedPromise<T>(func: promisedFunc<T>): promisedFunc<T>;
