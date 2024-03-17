import { Text } from "@vkontakte/vkui";
import { FC, memo, useMemo } from "react";

interface AgeMessageProps {
  age?: number | null | undefined;
}

export const AgeMessage: FC<AgeMessageProps> = memo(({ age }) => {
  const message = useMemo(() => {
    switch (age) {
      case undefined:
        return "Ваш возвраст будет определён после ввода имени";
      case null:
        return "Имя не было найдено";
      default:
        return `Ваш возвраст: ${age}`;
    }
  }, [age]);
  return <Text>{message}</Text>;
});
