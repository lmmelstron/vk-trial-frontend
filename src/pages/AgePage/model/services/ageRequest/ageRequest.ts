import { IAge } from "../../types/age";

export const ageRequest = async (
  name: string,
  ref?: React.MutableRefObject<AbortController | null>
): Promise<IAge> => {
  if (ref) ref.current = new AbortController();
  return fetch(`https://api.agify.io?name=${name}`, {
    signal: ref?.current?.signal || null,
  }).then((res) => res.json());
};
