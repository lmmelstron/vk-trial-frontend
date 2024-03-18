import { useEffect, useRef, useState } from "react";

import cls from "./Fact.module.scss";
import { Textarea } from "@vkontakte/vkui";
import { Controller, useForm } from "react-hook-form";

interface FactProps {
  str: string | undefined;
  isLoading: boolean;
}

export const Fact = ({ str, isLoading }: FactProps) => {
  const [caret, setCaret] = useState<number>(0);
  const ref = useRef<HTMLTextAreaElement>(null);
  const { control, watch } = useForm({
    defaultValues: {
      fact: str || "",
    },
    values: {
      fact: str,
    },
  });

  useEffect(() => {
    const subscription = watch(({ fact }) => {
      ref.current?.focus();
      setCaret((fact || "").indexOf(" ") || 0);
    });
    return () => subscription.unsubscribe();
  }, [ref, watch]);

  useEffect(() => {
    ref.current?.setSelectionRange(caret, caret);
  }, [caret]);

  return (
    <Controller
      name="fact"
      control={control}
      render={({ field: { onChange, value } }) => (
        <Textarea
          className={cls.Fact}
          getRef={ref}
          id="fact"
          value={value}
          onChange={onChange}
          disabled={isLoading}
          aria-multiline
          grow
        />
      )}
    />
  );
};
