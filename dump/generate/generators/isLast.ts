export function isLast<T>(item: T, items: T[]): boolean {
  return items && items.length && (items[items.length - 1] === item);
}
