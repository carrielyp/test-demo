import type { PickerTimeProps } from "antd/lib/date-picker/generatePicker";
import generatePicker from "antd/lib/date-picker/generatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import type { ReactNode } from "react";
import { useState } from "react";

import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import { DateUtil } from "../../../utils/DateUtil";
import type { FormItemProps } from "..";
import { Icon, FormItem, InputClearButton, extractFormItemProps } from "..";
import { DateFormat } from "../../../constants/dateFormat";

const AntdDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

type AntdDatePickerProps = Omit<PickerTimeProps<Dayjs>, "picker">;

type BaseTimePickerProps = Omit<FormItemProps, "children"> &
  Omit<
    AntdDatePickerProps,
    | "size"
    | "value"
    | "defaultPickerValue"
    | "disabledDate"
    | "onChange"
    | "onSelect"
    | "suffixIcon"
  > & {
    icon?: ReactNode;
    defaultPickerValue?: Date;
    disabledDate?: (date: Date) => boolean;
  };

export type TimePickerProps = BaseTimePickerProps & {
  valueType?: "date";
  value?: Date;
  onChange?: (date?: Date) => void;
};

export type StrTimePickerProps = BaseTimePickerProps & {
  valueType: "string";
  value?: string;
  onChange?: (date?: string) => void;
  stringFormat?: string;
};

export const TimePicker = (props: TimePickerProps | StrTimePickerProps) => {
  const {
    formItemProps,
    valueType,
    className,
    icon,
    value,
    disabledDate,
    onChange,
    defaultPickerValue,
    ...restProps
  } = extractFormItemProps(props);
  const { disabled, allowClear } = props;

  let stringFormat: string = DateFormat.API_TIME.replace("ss", "00");

  if (valueType === "string" && (props as any)["stringFormat"]) {
    stringFormat = (props as any)["stringFormat"];
  }

  const toDate = (value?: string | Date) =>
    valueType === "string"
      ? value
        ? DateUtil.toDate(`1900-01-01 ${value}`, `YYYY-MM-DD ${stringFormat}`)
        : undefined
      : (value as Date);

  const [internalValue, setInternalValue] = useState(
    value ? dayjs(toDate(value)) : undefined
  );

  useUpdateEffect(() => {
    setInternalValue(value ? dayjs(toDate(value)) : undefined);
  }, [value]);

  const internalOnChange = (value: Dayjs | null) => {
    setInternalValue(value || undefined);

    if (!value) {
      onChange?.(undefined);
    } else if (valueType === "string") {
      onChange?.(DateUtil.toString(value.toDate(), stringFormat) as any);
    } else {
      onChange?.(value.toDate() as any);
    }
  };

  return (
    <FormItem {...formItemProps}>
      <AntdDatePicker.TimePicker
        {...restProps}
        className={`h-12 rounded-lg border-0.5 ${className || ""}`}
        suffixIcon={
          icon === undefined ? (
            <Icon.Time className={`mr-2 ${disabled ? "" : "text-primary"}`} />
          ) : (
            icon
          )
        }
        clearIcon={allowClear && <InputClearButton />}
        disabledDate={
          disabledDate && ((date: any) => disabledDate(date?.toDate()))
        }
        defaultPickerValue={defaultPickerValue && dayjs(defaultPickerValue)}
        value={internalValue}
        onChange={internalOnChange}
        onSelect={internalOnChange}
      />
    </FormItem>
  );
};

TimePicker.defaultProps = {
  placeholder: "Select time",
  format: DateFormat.PICKER_TIME
};
