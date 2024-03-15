import { IFact } from "@entities/Fact";

export const factRequest = async (): Promise<IFact> => {
  const res = await fetch("https://catfact.ninja/fact");
  if (!res?.ok) throw new Error(`${res.status} - ${res.statusText}`);
  const data = await res.json();
  return data;
};
