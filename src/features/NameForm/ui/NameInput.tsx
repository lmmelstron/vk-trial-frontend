import { FormItem, Input } from "@vkontakte/vkui";
import { FC, memo } from "react";
import { Control, Controller } from "react-hook-form";

interface NameInputProps {
  control: Control<
    {
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  onKeyUp: () => void;
}

export const NameInput: FC<NameInputProps> = memo(({ control, onKeyUp }) => {
  return (
    <FormItem
      htmlFor="example"
      top="📝 Введите своё имя на английском языке"
      noPadding
    >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^a-z]/gi, ""))}
            onKeyUp={onKeyUp}
          />
        )}
        name="name"
      />
    </FormItem>
  );
});
