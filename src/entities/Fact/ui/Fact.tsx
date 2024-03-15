import { memo, useEffect, useRef } from "react";

import cls from "./Fact.module.scss";
import { Textarea } from "@vkontakte/vkui";
import { setCaret, setFocus } from "../model/services";

interface FactProps {
  str: string | undefined;
  isLoading: boolean;
}

export const Fact = memo(({ str, isLoading }: FactProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (str) {
      setFocus(ref);
      setCaret(ref, str);
    }
  }, [str]);

  return (
    <Textarea
      className={cls.Fact}
      getRef={ref}
      id="fact"
      defaultValue={str}
      disabled={isLoading}
      aria-multiline
      grow
    />
  );
});
