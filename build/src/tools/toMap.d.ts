import { StringMap, NumberMap } from '.';
export declare type selector<TKey, TItem> = ((item: TItem) => TKey);
export declare function toStringMap<TItem>(items: TItem[], selector: string | selector<string, TItem>): StringMap<TItem>;
export declare function toNumberMap<TItem>(items: TItem[], selector: string | selector<number, TItem>): NumberMap<TItem>;
