import type {
  RadioChangeEvent,
  RadioGroupProps as AntdRadioGroupProps,
  RadioProps as AntdRadioProps
} from "antd/lib/radio";
import AntdRadio from "antd/lib/radio";
import { useState } from "react";
import type { FormItemProps } from "..";
import { extractFormItemProps, FormItem } from "..";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";

export type RadioGroupProps = Omit<FormItemProps, "children"> &
  Omit<AntdRadioGroupProps, "options">;

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    formItemProps,
    value,
    onChange,
    className,
    optionType,
    ...restProps
  } = extractFormItemProps(props);

  const [internalValue, setInternalValue] = useState(value);

  useUpdateEffect(() => {
    setInternalValue(value);
  }, [value]);

  const internalOnChange = (e: RadioChangeEvent) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <FormItem {...formItemProps}>
      <AntdRadio.Group
        {...restProps}
        optionType={optionType}
        className={`${optionType === "button" ? "" : "space-y-2"} ${
          className || ""
        }`}
        value={internalValue}
        onChange={internalOnChange}
      />
    </FormItem>
  );
};

RadioGroup.defaultProps = {
  buttonStyle: "solid"
};

export type RadioProps = AntdRadioProps & {
  bordered?: boolean;
};

export const Radio = ({
  bordered,
  className,
  checked,
  disabled,
  ...props
}: RadioProps) => {
  let customClassName = "block ";

  if (bordered) {
    customClassName = "p-2 min-w-min border-0.5 border-solid rounded-lg ";

    if (disabled) {
      customClassName += "border-neutral-40 bg-neutral-20 ";
    } else if (checked) {
      customClassName += "border-primary bg-blue-10 ";
    } else {
      customClassName += "border-neutral-40 hover:opacity-75 ";
    }
  }

  if (disabled) {
    customClassName += "cursor-not-allowed ";
  }

  return (
    <AntdRadio
      {...props}
      checked={checked}
      disabled={disabled}
      className={`${customClassName} ${className || ""}`}
    />
  );
};

export type RadioButtonProps = AntdRadioProps & {
  bordered?: boolean;
  size?: "small" | "large";
};

export const RadioButton = ({
  className,
  size,
  ...props
}: RadioButtonProps) => (
  <AntdRadio.Button
    {...props}
    className={`${
      size === "small" ? "h-10" : "h-12"
    } inline-flex items-center ${className || ""}`}
  />
);
