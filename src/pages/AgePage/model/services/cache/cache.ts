import { IAge, TAgeCache } from "../../types/age";

const cache: TAgeCache = {};

export const getFromCache = (name: string) => {
  if (name in cache) return cache[name];
  return undefined;
};

export const setToCache = (name: string, data: IAge) => {
  cache[name] = data;
};
