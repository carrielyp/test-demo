import type { InputProps, InputRef } from "antd/lib/input";
import AntdInput from "antd/lib/input";
import type { ChangeEventHandler, RefObject } from "react";
import { useState } from "react";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import type { FormItemProps } from "../FormItem";
import { extractFormItemProps, FormItem } from "../FormItem";

export type TextInputProps = Omit<FormItemProps, "children"> &
  Omit<InputProps, "size"> & {
    inputRef?: RefObject<InputRef>;
    size?: "large" | "small";
  };

export const TextInput = (props: TextInputProps) => {
  const {
    formItemProps,
    inputRef,
    value,
    onChange,
    className,
    style,
    size,
    ...restProps
  } = extractFormItemProps(props);

  const [internalValue, setInternalValue] = useState(value || "");

  useUpdateEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const internalOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <FormItem {...formItemProps}>
      <AntdInput
        {...restProps}
        ref={inputRef}
        className={`text-input h-12 rounded-lg text-base ${size || ""} ${
          className || ""
        }`}
        style={style}
        value={internalValue}
        autoComplete="off"
        onChange={internalOnChange}
      />
    </FormItem>
  );
};
