import { FC, memo } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { Header } from "@widgets/index";
import { TaskLink } from "./TaskLink";
import { TASKS } from "../model/types/tasks";

export const Home: FC<NavIdProps> = memo(({ id }) => {
  return (
    <Panel id={id}>
      <Header title="Home" />
      {TASKS.map((el) => (
        <TaskLink title={el.title} link={el.link} key={el.link} />
      ))}
    </Panel>
  );
});
