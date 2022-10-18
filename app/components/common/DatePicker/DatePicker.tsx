import type { PickerDateProps } from "antd/lib/date-picker/generatePicker";
import generatePicker from "antd/lib/date-picker/generatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import type { ReactNode } from "react";
import { useState, useRef, useEffect, useMemo } from "react";

import { Regex } from "../../../constants";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import { DateUtil } from "../../../utils/DateUtil";
import type { FormItemProps } from "..";
import { Icon, FormItem, InputClearButton, extractFormItemProps } from "..";
import { DateFormat } from "../../../constants/dateFormat";

const AntdDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

type AntdDatePickerProps = Omit<PickerDateProps<Dayjs>, "picker">;

type BaseDatePickerProps = Omit<FormItemProps, "children"> &
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
    minDate?: Date;
    maxDate?: Date;
  };

export type DatePickerProps = BaseDatePickerProps & {
  valueType?: "date";
  value?: Date;
  onChange?: (date?: Date) => void;
};

export type StrDatePickerProps = BaseDatePickerProps & {
  valueType: "string";
  value?: string;
  onChange?: (date?: string) => void;
  stringFormat?: string;
};

export const DatePicker = (props: DatePickerProps | StrDatePickerProps) => {
  const {
    formItemProps,
    valueType,
    className,
    icon,
    value,
    disabledDate,
    minDate,
    maxDate,
    defaultPickerValue,
    onChange,
    format,
    ...restProps
  } = extractFormItemProps(props);

  const { disabled, allowClear, error } = props;

  const autoFormat = useMemo(
    () =>
      [DateFormat.PICKER_DATE, DateFormat.PICKER_DATETIME].includes(
        format as DateFormat
      ),
    [format]
  );

  let stringFormat: string;

  if (valueType === "string" && (props as any)["stringFormat"]) {
    stringFormat = (props as any)["stringFormat"];
  }

  const toDate = (value?: string | Date) =>
    valueType === "string"
      ? value
        ? DateUtil.toDate(value as string, stringFormat)
        : undefined
      : (value as Date);

  const [internalValue, setInternalValue] = useState(
    value ? dayjs(toDate(value)) : undefined
  );

  const pickerRef = useRef<HTMLDivElement>(null);
  const [keyUpEvent, setKeyUpEvent] = useState<KeyboardEvent>();

  useEffect(() => {
    const input = pickerRef.current?.querySelector("input") as HTMLInputElement;

    if (input) {
      input.onkeyup = autoFormat ? setKeyUpEvent : null;
    }
  }, [autoFormat]);

  useUpdateEffect(() => {
    setInternalValue(value ? dayjs(toDate(value)) : undefined);
  }, [value]);

  // For auto format only
  useUpdateEffect(() => {
    if (
      !autoFormat ||
      !keyUpEvent ||
      !(keyUpEvent?.target as HTMLInputElement)?.["value"]
    ) {
      return;
    }

    const input = keyUpEvent.target as HTMLInputElement;

    // Valid chars are 0-9 / : a m p and space
    const isValidInput =
      (keyUpEvent.key >= "0" && keyUpEvent.key <= "9") ||
      ["/", ":", "a", "m", "p", " "].includes(keyUpEvent.key);

    // Replace invalid chars
    if (!isValidInput) {
      const dateRegex =
        format === DateFormat.PICKER_DATETIME
          ? Regex.PICKER_DATETIME
          : Regex.PICKER_DATE;

      keyUpEvent.preventDefault();
      input.value = input.value.replace(dateRegex, "");

      return;
    }

    // Format the value
    input.value = autoFormatDate(input.value);
    const allowedLength = DateFormat.PICKER_DATETIME ? 18 : 10;

    if (input.value.length === allowedLength) {
      internalOnChange(dayjs(input.value, format as string));
    }
  }, [keyUpEvent]);

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
      <div ref={pickerRef}>
        <AntdDatePicker
          {...restProps}
          className={`flex h-12 items-center rounded-lg border-0.5 ${
            error ? "border-red-40" : ""
          } ${className || ""}`}
          suffixIcon={
            icon === undefined ? (
              <Icon.Calendar
                className={`mr-2 ${disabled ? "" : "text-primary"}`}
              />
            ) : (
              icon
            )
          }
          clearIcon={allowClear && <InputClearButton />}
          disabledDate={(date: { toDate: () => Date }) => {
            if (disabledDate) {
              return disabledDate(date.toDate());
            }

            return (
              (!!minDate && DateUtil.isBeforeDate(date.toDate(), minDate)) ||
              (!!maxDate && DateUtil.isAfterDate(date.toDate(), maxDate))
            );
          }}
          defaultPickerValue={defaultPickerValue && dayjs(defaultPickerValue)}
          value={internalValue}
          onChange={internalOnChange}
          onSelect={internalOnChange}
          format={format}
        />
      </div>
    </FormItem>
  );
};

DatePicker.defaultProps = {
  placeholder: "Select date",
  format: DateFormat.PICKER_DATE
};

export const autoFormatDate = (value: string) => {
  const dateFormatter = (num: string, from: number, limit: number) => {
    // Add zero leading if single digit
    let formatNum =
      Number(num) > from && Number(num) < 10 && num.length === 1
        ? `0${num}`
        : num;

    if (Number(formatNum) > limit) {
      formatNum = formatNum.substring(1, 2);
      formatNum =
        Number(formatNum) > from &&
        Number(formatNum) < 10 &&
        formatNum.length === 1
          ? `0${formatNum}`
          : formatNum;
    }

    return formatNum;
  };

  const time = value.substring(10);

  let split = value.substring(0, 10).split("/");

  // Format day value
  if (split[0]) {
    const day = split[0];

    // This condition used to add zero leading for day when user type in one digit and slash
    if (day.length === 1 && split.length >= 2) {
      split[0] = dateFormatter(day, 0, 31);
      // This condition used to split month when user remove slash (after day) and type in number
    } else if (day.length === 3) {
      split.push(day.substring(2, 3));
      split[0] = day.substring(0, 2);
    } else {
      split[0] = dateFormatter(day, 3, 31);
    }
  }

  // Format month value
  if (split[1]) {
    const month = split[1];

    // This condition used to add zero leading for month when user type in one digit and slash
    if (month.length === 1 && split.length >= 3) {
      split[1] = dateFormatter(month, 0, 31);
      // This condition used to split year when user remove slash (after month) and type in number
    } else if (month.length === 3) {
      split.push(month.substring(2, 3));
      split[1] = month.substring(0, 2);
    } else {
      split[1] = dateFormatter(split[1], 1, 12);
    }
  }

  split = split.map((val, idx) =>
    val.length === 2 && idx < 2 ? `${val}/` : val.substring(0, 4)
  );

  return split.join("").substring(0, 10) + time;
};
