import type { CSSProperties } from "react";
import { useState } from "react";

import { usePrevious } from "../../../hooks/usePrevious";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import { DateUtil } from "../../../utils/DateUtil";
import type { FormItemProps } from "..";
import { FormItem, DatePicker, TimePicker, extractFormItemProps } from "..";
import { DateFormat } from "../../../constants/dateFormat";

type BaseDateTimePickerProps = Omit<FormItemProps, "children"> & {
  className?: string;
  style?: CSSProperties;
  datePickerClassName?: string;
  datePickerStyle?: CSSProperties;
  timePickerClassName?: string;
  timePickerStyle?: CSSProperties;
  placeholder?: [string, string];
  format?: [string, string];
  defaultPickerValue?: Date | [Date, Date];
  disabledDate?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  allowClear?: boolean;
};

export type DateTimePickerProps = BaseDateTimePickerProps & {
  valueType?: "date";
  value?: Date;
  onChange?: (date?: Date) => void;
};

export type StrDateTimePickerProps = BaseDateTimePickerProps & {
  valueType: "string";
  value?: string;
  onChange?: (date?: string) => void;
  stringFormat?: string;
};

export const DateTimePicker = (
  props: DateTimePickerProps | StrDateTimePickerProps
) => {
  const {
    formItemProps,
    valueType,
    className,
    style,
    datePickerClassName,
    datePickerStyle,
    timePickerClassName,
    timePickerStyle,
    placeholder,
    format,
    defaultPickerValue,
    disabledDate,
    minDate,
    maxDate,
    value,
    onChange,
    ...restProps
  } = extractFormItemProps(props);

  let stringFormat: string = DateFormat.API_DATETIME.replace("ss", "00");

  if (valueType === "string" && (props as any)["stringFormat"]) {
    stringFormat = (props as any)["stringFormat"];
  }

  const toDate = (value?: string | Date) =>
    valueType === "string"
      ? value
        ? DateUtil.toDate(value as string, stringFormat)
        : undefined
      : (value as Date);

  const [date, setDate] = useState(toDate(value));
  const [time, setTime] = useState(toDate(value));
  const [internalValue, setInternalValue] = useState(
    !date || !time ? undefined : DateUtil.setTime(date, time)
  );
  const prevInternalValue = usePrevious(internalValue);

  useUpdateEffect(() => {
    setDate(toDate(value));
    setTime(toDate(value));
  }, [value]);

  useUpdateEffect(() => {
    setInternalValue(!date || !time ? undefined : DateUtil.setTime(date, time));
  }, [date, time]);

  useUpdateEffect(() => {
    if (internalValue?.getTime() === prevInternalValue?.getTime()) {
      return;
    }

    if (!internalValue) {
      onChange?.(undefined);
    } else if (valueType === "string") {
      onChange?.(DateUtil.toString(internalValue, stringFormat) as any);
    } else {
      onChange?.(internalValue as any);
    }
  }, [internalValue]);

  let dateDefaultPickerValue: Date | undefined;
  let timeDefaultPickerValue: Date | undefined;

  if (defaultPickerValue) {
    if (defaultPickerValue instanceof Date) {
      dateDefaultPickerValue = defaultPickerValue;
      timeDefaultPickerValue = defaultPickerValue;
    } else {
      dateDefaultPickerValue = defaultPickerValue[0];
      timeDefaultPickerValue = defaultPickerValue[1];
    }
  }

  return (
    <FormItem {...formItemProps}>
      <div className={`flex space-x-4 ${className || ""}`} style={style}>
        <div className="flex-1">
          <DatePicker
            {...restProps}
            className={`w-full ${datePickerClassName || ""}`}
            style={datePickerStyle}
            placeholder={placeholder?.[0]}
            format={format?.[0]}
            defaultPickerValue={dateDefaultPickerValue}
            disabledDate={disabledDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => setDate(date)}
            value={internalValue}
          />
        </div>
        <div className="flex-1">
          <TimePicker
            {...restProps}
            className={`w-full ${timePickerClassName || ""}`}
            style={timePickerStyle}
            placeholder={placeholder?.[1]}
            format={format?.[1]}
            defaultPickerValue={timeDefaultPickerValue}
            onChange={(time) => setTime(time)}
            value={internalValue}
          />
        </div>
      </div>
    </FormItem>
  );
};
