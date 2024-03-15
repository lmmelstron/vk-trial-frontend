import { FC, memo, useCallback } from "react";
import {
  Button,
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Spinner,
  Text,
} from "@vkontakte/vkui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fact, IFact } from "@entities/Fact";

import cls from "./FactPage.module.scss";
import { factRequest } from "../model/services";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface IFactPageProps extends NavIdProps {}

export const FactPage: FC<IFactPageProps> = memo(({ id }) => {
  const routeNavigator = useRouteNavigator();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery<IFact>({
    queryKey: ["fact"],
    queryFn: factRequest,
  });

  const requestFact = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["fact"] }),
    [queryClient]
  );

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Fact page
      </PanelHeader>

      <Group mode="plain" className={cls.Group}>
        <Fact str={data?.fact} isLoading={isLoading} />
        <Button
          before={
            isLoading && <Spinner size="small" style={{ margin: "20px 0" }} />
          }
          marginHeight={10}
          stretched
          size="l"
          mode="secondary"
          onClick={requestFact}
        >
          Запросить новый факт
        </Button>
        {isError && <Text color="error">{error.message}</Text>}
      </Group>
    </Panel>
  );
});
