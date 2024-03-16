export interface IAge {
  age: number;
  count: number;
  name: string;
}

export type TAgeCache = Record<string, IAge>;
