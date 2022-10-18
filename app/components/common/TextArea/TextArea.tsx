import type {
  KeyboardEventHandler,
  ReactNode,
  ChangeEventHandler
} from "react";
import { forwardRef, useEffect, useState } from "react";
import type { TextareaAutosizeProps } from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";
import type { FormItemProps } from "../FormItem";
import { extractFormItemProps, FormItem } from "../FormItem";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";

export type TextAreaProps = Omit<FormItemProps, "children"> &
  Omit<TextareaAutosizeProps, "value" | "maxRows"> & {
    hideCount?: boolean;
    value?: string;
    onPressEnter?: KeyboardEventHandler<HTMLTextAreaElement>;
    maxRows?: number | false;
    footer?: ReactNode;
  };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      formItemProps,
      hideCount,
      className,
      style,
      value,
      onChange,
      rows,
      onKeyPress,
      onPressEnter,
      onBlur,
      onFocus,
      footer,
      ...restProps
    } = extractFormItemProps(props);

    let { minRows, maxRows } = restProps;
    const { disabled, error } = props;

    if ((minRows === null || minRows === undefined) && rows) {
      minRows = rows;
    }

    if (
      minRows !== null &&
      minRows !== undefined &&
      typeof maxRows === "number" &&
      minRows > maxRows
    ) {
      maxRows = minRows;
    }

    const [internalValue, setInternalValue] = useState(value || "");
    const [count, setCount] = useState(value?.length || 0);
    const [focus, setFocus] = useState(false);

    useUpdateEffect(() => {
      setInternalValue(value || "");
    }, [value]);

    useEffect(() => {
      setCount(internalValue.length);
    }, [internalValue]);

    const internalOnChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const internalOnKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter") {
        onPressEnter?.(e);
      }

      onKeyPress?.(e);
    };

    const showFooter = (!hideCount && !disabled) || !!footer;

    let name = "textarea";

    name += error ? "-error" : "";
    name += focus ? "-focus" : "";
    name += disabled ? "-disabled" : "";

    let wrapperClassName = "rounded-lg border-0.5 border-solid transition ";

    if (disabled) {
      wrapperClassName += "form-input-disabled cursor-not-allowed ";
    } else {
      wrapperClassName += "bg-white ";

      if (error) {
        wrapperClassName += "border-red-40 ";
      } else if (focus) {
        wrapperClassName += "border-primary ";
      } else {
        wrapperClassName += "border-neutral-40 hover:border-primary";
      }

      if (focus) {
        wrapperClassName += "ring-2 ring-opacity-20 ";

        if (error) {
          wrapperClassName += "ring-red-40 border-red-40 ";
        } else {
          wrapperClassName += "ring-primary border-primary ";
        }
      }
    }

    return (
      <FormItem {...formItemProps}>
        <div
          className={`${name} ${wrapperClassName} ${className || ""}`}
          style={style}
        >
          <TextareaAutosize
            {...restProps}
            ref={ref}
            className={`w-full resize-y rounded-lg border-0 px-3 placeholder-neutral-40 ${
              !hideCount && !disabled ? "pb-6" : "pb-1"
            }`}
            style={{ marginTop: 5, marginBottom: showFooter ? -7 : undefined }}
            minRows={minRows}
            maxRows={maxRows || undefined}
            value={internalValue}
            onChange={internalOnChange}
            onKeyPress={internalOnKeyPress}
            onFocus={(e) => {
              setFocus(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocus(false);
              onBlur?.(e);
            }}
          />

          {showFooter && (
            <div className="flex items-end justify-between space-x-2 px-2 py-1">
              <div>{footer}</div>
              {!hideCount && !disabled && (
                <div className="text-xs">
                  {count}
                  {props.maxLength ? ` / ${props.maxLength}` : ""}
                </div>
              )}
            </div>
          )}
        </div>
      </FormItem>
    );
  }
);

TextArea.defaultProps = {
  rows: 4,
  maxRows: 10
};

TextArea.displayName = "TextArea";
