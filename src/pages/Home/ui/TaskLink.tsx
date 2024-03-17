import { DEFAULT_VIEW_PANELS } from "@shared/config/routerConfig/routerConfig";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Button, Div, Group, Header } from "@vkontakte/vkui";
import { FC, memo } from "react";

interface TaskLinkProps {
  title: string;
  link: DEFAULT_VIEW_PANELS;
}

export const TaskLink: FC<TaskLinkProps> = memo(({ title, link }) => {
  const routeNavigator = useRouteNavigator();
  return (
    <Group
      header={
        <Header mode="secondary" multiline>
          {title}
        </Header>
      }
      mode="plain"
    >
      <Div>
        <Button
          stretched
          size="l"
          mode="secondary"
          onClick={() => routeNavigator.push(link)}
        >
          Перейти
        </Button>
      </Div>
    </Group>
  );
});
