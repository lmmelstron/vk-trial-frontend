import { RefObject } from "react";

export const setFocus = (ref: RefObject<HTMLTextAreaElement> | null): void => {
  if (!ref?.current) return;
  ref.current.focus();
};
