export function normalizePath(path: string): string {
  path = path.replace(/\\/g, '/');
  if (path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }

  return path;
}
