
export function trimExtension(file: string): string {
  return stripLast(file, '.');
}

export function trimFilename(path: string): string {
  return stripLast(path, '/');
}

export function stripLast(line: string, symbol: string): string {
  const index = line.lastIndexOf(symbol);
  if (index === -1) {
    return line;
  }
  return line.substr(0, index);
}
