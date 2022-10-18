import type { CSSProperties, Key, ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Chip } from "../Chip";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import type { FormItemProps } from "../FormItem";
import { extractFormItemProps, FormItem } from "../FormItem";

interface ChipToggleGroupContextProps {
  value?: Key;
  onChange?: (value?: Key) => void;
  disabled?: boolean;
  allowClear?: boolean;
}

const ChipToggleGroupContext = createContext<ChipToggleGroupContextProps>(
  null as any
);

type BaseChipToggleGroupProps<T> = {
  id?: string;
  children: ReactNode;
  disabled?: boolean;
  value?: T;
  onChange?: (value: T) => void;
  allowClear?: boolean;
};

export type ChipToggleGroupProps<T extends Key> = Omit<
  FormItemProps,
  "children"
> &
  BaseChipToggleGroupProps<T>;

export const ChipToggleGroup = <T extends Key>(
  props: ChipToggleGroupProps<T>
) => {
  const { formItemProps, ...chipProps } = extractFormItemProps(props);
  const { value, onChange, children, disabled, allowClear } = chipProps;
  const [internalValue, setInternalValue] = useState(value);

  useUpdateEffect(() => {
    setInternalValue(value);
  }, [value]);

  const internalOnChange = (value: T) => {
    setInternalValue(value);
    onChange?.(value);
  };

  return (
    <FormItem {...{ ...formItemProps, errorClassName: "pt-2" }}>
      <ChipToggleGroupContext.Provider
        value={{
          value: internalValue,
          onChange: internalOnChange as any,
          disabled,
          allowClear
        }}
      >
        <div id={formItemProps.id} className="space-x-2">
          {children}
        </div>
      </ChipToggleGroupContext.Provider>
    </FormItem>
  );
};

export interface ChipToggleProps {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  children: ReactNode;
  value?: Key | boolean;
  error?: string;
  onChange?: (value: boolean) => void;
}

export const ChipToggle = ({
  className,
  style,
  disabled,
  children,
  value,
  error,
  onChange
}: ChipToggleProps) => {
  const group = useContext(ChipToggleGroupContext);

  const [selected, setSelected] = useState(
    typeof value === "boolean" ? value : false
  );

  if (group?.disabled) {
    disabled = true;
  }

  useEffect(() => {
    if (group) {
      setSelected(group.value === value);
    }
  }, [group?.value]);

  useUpdateEffect(() => {
    if (!group && typeof value === "boolean") {
      setSelected(value);
    }
  }, [value]);

  const onClick = () => {
    if (group) {
      group.onChange?.(selected ? undefined : (value as Key));
    } else {
      setSelected(!selected);
      onChange?.(!selected);
    }
  };

  return (
    <Chip
      className={className}
      style={style}
      onClick={
        !disabled && (!selected || !group || group.allowClear)
          ? onClick
          : undefined
      }
      disabled={disabled}
      active={selected}
      error={error}
    >
      {children}
    </Chip>
  );
};
