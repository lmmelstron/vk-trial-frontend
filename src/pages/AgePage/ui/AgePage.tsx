import { FC, memo, useCallback, useRef } from "react";
import {
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Text,
} from "@vkontakte/vkui";
import { useMutation } from "@tanstack/react-query";

import cls from "./AgePage.module.scss";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { ageRequest } from "../model/services";
import { NameForm } from "@features/NameForm";

interface IAgePageProps extends NavIdProps {}

export const AgePage: FC<IAgePageProps> = memo(({ id }) => {
  const routeNavigator = useRouteNavigator();

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
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Определение возраста
      </PanelHeader>
      <Group mode="plain" className={cls.Group}>
        <NameForm isLoading={isPending} onSubmit={requestFact} />

        {data && (
          <Text>
            Ваш возвраст:{" "}
            {data?.age ? data.age : "будет определён после ввода имени"}
          </Text>
        )}
        {isError && <Text className={cls.Error}>{error.message}</Text>}
      </Group>
    </Panel>
  );
});
