import { FC, memo, useCallback } from "react";
import {
  Button,
  Group,
  NavIdProps,
  Panel,
  Spinner,
  Text,
} from "@vkontakte/vkui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fact, IFact } from "@entities/Fact";

import cls from "./FactPage.module.scss";
import { factRequest } from "../model/services";
import { Header } from "@widgets/index";

interface IFactPageProps extends NavIdProps {}

export const FactPage: FC<IFactPageProps> = memo(({ id }) => {
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
      <Header isReturnButton title="Fact page" />
      <Group mode="plain" className={cls.Group}>
        <Fact str={data?.fact} isLoading={isLoading} />
        <Button
          before={
            isLoading && <Spinner size="small" style={{ margin: "20px 0" }} />
          }
          stretched
          size="l"
          mode="secondary"
          onClick={requestFact}
          disabled={isLoading}
        >
          Запросить новый факт
        </Button>
        {isError && <Text className={cls.Error}>{error.message}</Text>}
      </Group>
    </Panel>
  );
});
