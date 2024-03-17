import { FC, memo, useCallback, useRef } from "react";
import { Group, NavIdProps, Panel, Text } from "@vkontakte/vkui";
import { useMutation } from "@tanstack/react-query";

import cls from "./AgePage.module.scss";
import { ageRequest } from "../model/services";
import { NameForm } from "@features/NameForm";
import { Header } from "@widgets/index";
import { AgeMessage } from "./AgeMessage";

interface IAgePageProps extends NavIdProps {}

export const AgePage: FC<IAgePageProps> = memo(({ id }) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const { isPending, isError, error, data, mutateAsync, reset } = useMutation({
    mutationFn: (name: string) => ageRequest(name, abortControllerRef),
  });

  const onReset = useCallback(() => {
    abortControllerRef.current?.abort();
    reset();
  }, [abortControllerRef, reset]);

  const requestFact = useCallback(
    (name: string) => {
      if (name) {
        onReset();
        mutateAsync(name);
      }
    },
    [onReset, mutateAsync]
  );

  return (
    <Panel id={id}>
      <Header title="Определение возраста" isReturnButton />
      <Group mode="plain" className={cls.Group}>
        <NameForm isLoading={isPending} onSubmit={requestFact} />

        {data && <AgeMessage age={data.age} />}
        {isError && <Text className={cls.Error}>{error.message}</Text>}
      </Group>
    </Panel>
  );
});
