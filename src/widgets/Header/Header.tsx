import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { FC, useMemo } from "react";

interface HeaderProps {
  title: string;
  isReturnButton?: boolean;
}

export const Header: FC<HeaderProps> = ({ title, isReturnButton }) => {
  const routeNavigator = useRouteNavigator();

  const btn = useMemo(
    () =>
      isReturnButton && (
        <PanelHeaderBack onClick={() => routeNavigator.back()} />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isReturnButton]
  );
  return <PanelHeader before={btn}>{title}</PanelHeader>;
};
