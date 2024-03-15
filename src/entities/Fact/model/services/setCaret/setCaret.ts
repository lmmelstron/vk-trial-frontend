import { RefObject } from "react";

export const setCaret = (
  ref: RefObject<HTMLTextAreaElement> | null,
  str: string
): void => {
  if (!ref?.current) return;
  const index = str.indexOf(" ");

  ref.current.setSelectionRange(index, index);
};
