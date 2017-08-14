export enum Quotes {
  single = 'single',
  double = 'double'
}
export interface Options {
  path: string;
  tsconfig?: object;
  quotes?: Quotes;
}
