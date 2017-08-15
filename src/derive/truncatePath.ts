export function truncatePath(path: string): string {
  const split = path.split('/');
  return split.slice(0, split.length - 1).join('/');
}
