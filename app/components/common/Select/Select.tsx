import type {
  SelectProps as AntdSelectProps,
  OptionProps,
  SelectValue as AntdSelectValue
} from "antd/lib/select";
import AntdSelect from "antd/lib/select";
import type { OptGroupProps } from "rc-select/lib/OptGroup";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { StringUtil } from "../../../utils";
import { CaretsUpDown, Icon, InputClearButton } from "..";

import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import type { FormItemProps } from "../FormItem";
import { extractFormItemProps, FormItem } from "../FormItem";
import { InputErrorMessage } from "../InputErrorMessage";

export type SelectValue = AntdSelectValue;

type OmittedAntdSelectProps =
  | "options"
  | "optionFilterProp"
  | "size"
  | "value"
  | "bordered"
  | "suffixIcon"
  | "showArrow"
  | "dropdownMatchSelectWidth"
  | "dropdownAlign";

export type SelectProps<T extends SelectValue> = Omit<
  FormItemProps,
  "children"
> &
  Omit<AntdSelectProps<T>, OmittedAntdSelectProps> & {
    icon?: ReactNode;
    value?: T | null;
    width?: number;
  };

export const Select = <T extends SelectValue>(props: SelectProps<T>) => {
  const { formItemProps, ...selectProps } = extractFormItemProps(props);
  const { error, errorClassName, errorStyle, ...restFormItemProps } =
    formItemProps;

  const {
    className,
    width,
    style,
    value,
    onChange,
    icon,
    clearIcon,
    placeholder,
    onBlur,
    onFocus,
    onDropdownVisibleChange,
    dropdownClassName,
    filterOption,
    getPopupContainer,
    ...restSelectProps
  } = selectProps;
  const { mode, showSearch, disabled } = restSelectProps;
  const selectRef = useRef<any>(null);

  const hasIcon = !!icon || !!showSearch;

  const selectId = useRef(StringUtil.generateUuid());
  const [inModal, setInModal] = useState(false);

  const [open, setOpen] = useState(!!props.open);
  const [focus, setFocus] = useState(false);

  const [internalValue, setInternalValue] = useState(
    value === null ? undefined : value
  );

  useUpdateEffect(() => {
    setInternalValue(value === null ? undefined : value);
  }, [value]);

  const internalOnChange: typeof onChange = (value, option) => {
    mode !== "tags" && mode !== "multiple" && value && selectRef.current.blur();
    setInternalValue(value);
    onChange?.(value, option);
  };

  useEffect(() => {
    // To fix select dropdown z-index issue on scroll and in modal
    const select = document.getElementById(selectId.current);
    const modal = select?.closest(".modal");

    setInModal(!!modal);
  }, []);

  useEffect(() => {
    setOpen(!!props.open);
  }, [props.open]);

  const divRef = useRef<any>(null);
  let divWidth = 0;

  if (divRef.current) {
    divWidth = divRef.current.clientWidth + 2;
  }

  let name = "select";

  if (disabled) {
    name += "-disabled";
  }

  if (error) {
    name += "-error";
  }

  if (focus) {
    name += "-focus";
  }

  if (open) {
    name += "-open";
  }

  return (
    <>
      <FormItem {...restFormItemProps}>
        <div
          ref={divRef}
          className={`
            ${name} flex items-center rounded-lg border-0.5 border-solid pr-2 transition
            ${
              error
                ? "border-red-40"
                : open
                ? "border-primary"
                : "border-neutral-40"
            }
            ${
              open &&
              `${error ? "select-error-box-shadow" : "select-box-shadow"}`
            }
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            ${disabled ? "form-input-disabled" : "bg-white"}
            ${disabled || error ? "" : "hover:border-primary"}
            ${
              !disabled && focus
                ? `border-primary ring-2 ring-opacity-20 ${
                    error ? "ring-red-40" : "ring-primary"
                  }`
                : ""
            }
            ${className || ""}
          `}
          style={{ width, minHeight: 48, ...style }}
        >
          <AntdSelect
            {...restSelectProps}
            ref={selectRef}
            id={selectId.current}
            style={{ width: "calc(100% - 12px)" }}
            className={`select ${hasIcon ? "select-icon" : ""}`}
            bordered={false}
            showArrow
            suffixIcon={
              icon ||
              (showSearch && (
                <Icon.Search
                  className={`${disabled ? "" : "text-primary"} -mt-0.5`}
                  size={16}
                />
              )) ||
              null
            }
            clearIcon={
              clearIcon || (
                <div className="flex h-3 w-3 space-x-1">
                  <InputClearButton className="-mt-0.5" />
                  <div className="-my-1 border border-t-0 border-b-0 border-l-0 border-r border-solid border-neutral-30" />
                </div>
              )
            }
            value={internalValue}
            onChange={internalOnChange}
            open={open}
            placeholder={
              placeholder ? (
                hasIcon ? (
                  <span className={!mode ? "" : "ml-6"}>{placeholder}</span>
                ) : (
                  placeholder
                )
              ) : undefined
            }
            getPopupContainer={
              getPopupContainer ? getPopupContainer : () => divRef.current
            }
            dropdownClassName={`select-dropdown py-0 ${
              dropdownClassName || ""
            } absolute`}
            dropdownStyle={{ width: divWidth, zIndex: inModal ? 1050 : 40 }}
            dropdownMatchSelectWidth={divWidth}
            dropdownAlign={{
              offset: [-1, 10],
              overflow: { adjustX: false, adjustY: false }
            }}
            onDropdownVisibleChange={(open) => {
              setOpen(open);
              onDropdownVisibleChange?.(open);
            }}
            onFocus={(e) => {
              setFocus(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocus(false);
              onBlur?.(e);
            }}
            filterOption={
              filterOption !== undefined
                ? filterOption
                : (search, option) => {
                    const { children, label } = option || {};

                    if (typeof label === "string") {
                      return label.toLowerCase().includes(search.toLowerCase());
                    }

                    if (typeof children === "string") {
                      return (children as string)
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    }

                    return false;
                  }
            }
          />
          <div>
            <CaretsUpDown
              up={open}
              className={`select-carets ${
                disabled ? "text-neutral-40" : "text-primary"
              }`}
              size={12}
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        {error && (
          <InputErrorMessage className={errorClassName} style={errorStyle}>
            {error}
          </InputErrorMessage>
        )}
      </FormItem>
    </>
  );
};

Select.defaultProps = {
  maxTagTextLength: 25
};

export type SelectOptionProps = OptionProps;

export const SelectOption = AntdSelect.Option;

export type SelectOptGroupProps = OptGroupProps;

export const SelectOptGroup = AntdSelect.OptGroup;
