/* eslint-disable @typescript-eslint/no-explicit-any */
import AntdFormItem from "antd/lib/form/FormItem";
import type { CSSProperties, ReactNode } from "react";
import { InputErrorMessage } from "../InputErrorMessage";
import { InputLabel } from "../InputLabel/InputLabel";

export interface FormItemProps {
  id?: string;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  label?: ReactNode;
  labelClassName?: string;
  labelStyle?: CSSProperties;
  required?: boolean;
  optional?: boolean;
  assistiveText?: string;
  nextLineAssistiveText?: ReactNode;
  error?: ReactNode;
  errorClassName?: string;
  errorStyle?: CSSProperties;
  children: ReactNode;
}

export const FormItem = ({
  id,
  containerClassName,
  containerStyle,
  label,
  labelClassName,
  labelStyle,
  required,
  optional,
  assistiveText,
  nextLineAssistiveText,
  error,
  errorClassName,
  errorStyle,
  children
}: FormItemProps) => (
  <AntdFormItem
    className={containerClassName}
    style={{ margin: 0, ...containerStyle }}
    validateStatus={error ? "error" : undefined}
  >
    {label && (
      <InputLabel
        id={id ? `${id}Label` : undefined}
        className={labelClassName}
        style={labelStyle}
        required={required}
        optional={optional}
        assistiveText={assistiveText}
        nextLineAssistiveText={nextLineAssistiveText}
      >
        {label}
      </InputLabel>
    )}
    {children}
    {error && (
      <InputErrorMessage className={errorClassName} style={errorStyle}>
        {error}
      </InputErrorMessage>
    )}
  </AntdFormItem>
);

export function extractFormItemProps<T>(props: T): Omit<
  T,
  keyof Omit<FormItemProps, "children">
> & {
  formItemProps: Omit<FormItemProps, "children">;
} {
  const {
    containerClassName,
    containerStyle,
    label,
    labelClassName,
    labelStyle,
    required,
    optional,
    assistiveText,
    nextLineAssistiveText,
    error,
    errorClassName,
    errorStyle,
    ...restProps
  } = props as any;

  const formItemProps = {
    id: restProps.id,
    containerClassName,
    containerStyle,
    label,
    labelClassName,
    labelStyle,
    required,
    optional,
    assistiveText,
    nextLineAssistiveText,
    error,
    errorClassName,
    errorStyle
  };

  return { formItemProps, ...restProps };
}
