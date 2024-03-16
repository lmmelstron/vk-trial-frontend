import { FC } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  NavIdProps,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { DEFAULT_VIEW_PANELS } from "@shared/config/routerConfig/routerConfig";

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Home</PanelHeader>

      <Group
        header={
          <Header mode="secondary" multiline>
            Задание 1: запрос факта, с последующей установкой курсора после
            первого слова.
          </Header>
        }
        mode="plain"
      >
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push(DEFAULT_VIEW_PANELS.FACT)}
          >
            Перейти
          </Button>
        </Div>
      </Group>
      <Group
        header={
          <Header mode="secondary" multiline>
            Задание 2: автоопределение возвраста, на основе введённого значения
            по истечению таймера или нажатию кнопки.
          </Header>
        }
        mode="plain"
      >
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push(DEFAULT_VIEW_PANELS.AGE)}
          >
            Перейти
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
