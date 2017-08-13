export function endsWith(src: string, subString: string): boolean {
    const ending = src.substr(src.length - subString.length);
    return ending === subString;
}
