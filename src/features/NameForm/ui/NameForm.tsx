import { FC, memo, useCallback, useRef } from "react";
import { Button, FormItem, Input, Spinner } from "@vkontakte/vkui";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import cls from "./NameForm.module.scss";
import debounce from "lodash.debounce";

interface NameFormProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

export const NameForm: FC<NameFormProps> = memo((props) => {
  const { onSubmit, isLoading } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  const onCustomSubmit = useCallback<SubmitHandler<{ name: string }>>(
    (data) => {
      if (timeout?.current) clearTimeout(timeout.current);
      return onSubmit(data.name);
    },
    [timeout, onSubmit]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sumbitByTimeout = useCallback(
    debounce(() => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => onCustomSubmit(getValues()), 3000);
    }, 100),
    [onCustomSubmit, getValues]
  );

  return (
    <form onSubmit={handleSubmit(onCustomSubmit)} className={cls.Form}>
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
              getRef={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value.replace(/[^a-z]/gi, ""))}
              onKeyUp={sumbitByTimeout}
            />
          )}
          name="name"
        />
      </FormItem>
      {errors.name && <span>This field is required</span>}
      <Button
        before={
          isLoading && <Spinner size="small" style={{ margin: "20px 0" }} />
        }
        stretched
        size="l"
        mode="secondary"
        type="submit"
        className={cls.ButtonSubmit}
      >
        Узнать
      </Button>
    </form>
  );
});
