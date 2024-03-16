import { IAge } from "../../types/age";
import { getFromCache, setToCache } from "../cache/cache";

export const ageRequest = async (
  name: string,
  ref?: React.MutableRefObject<AbortController | null>
): Promise<IAge> => {
  const cache = getFromCache(name);
  if (cache !== undefined) return cache;
  if (ref) ref.current = new AbortController();
  return fetch(`https://api.agify.io?name=${name}`, {
    signal: ref?.current?.signal || null,
  })
    .then((res) => res.json())
    .then((data) => {
      setToCache(name, data);
      return data;
    });
};
