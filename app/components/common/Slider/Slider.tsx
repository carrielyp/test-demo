import type { SliderSingleProps } from "antd/lib/slider";
import AntdSlider from "antd/lib/slider";

import { useEffect, useState } from "react";
import { Color } from "../../../constants/design-system";
import { useUpdateEffect } from "../../../hooks/useUpdateEffect";
import type { FormItemProps } from "../FormItem";
import { extractFormItemProps, FormItem } from "../FormItem";

export type SliderProps = Omit<FormItemProps, "children"> &
  Omit<
    SliderSingleProps,
    | "vertical"
    | "tooltipVisible"
    | "tooltipPlacement"
    | "tipFormatter"
    | "getTooltipPopupContainer"
  > & {
    min: number;
    max: number;
    showNum: boolean;
  };

export const Slider = (props: SliderProps) => {
  const {
    formItemProps,
    trackStyle,
    handleStyle,
    value,
    onChange,
    showNum,
    ...restProps
  } = extractFormItemProps(props);
  const { defaultValue, min, max, className, style, disabled } = props;

  const [internalValue, setInternalValue] = useState(
    value || defaultValue || min
  );
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(((internalValue - min) / (max - min)) * 100);
  }, [internalValue]);

  useUpdateEffect(() => {
    setInternalValue(value || min);
  }, [value]);

  const internalOnChange = (value: number) => {
    setInternalValue(value);
    onChange?.(value);
  };

  return (
    <FormItem {...formItemProps}>
      <div className={className} style={style}>
        {showNum && (
          <div className="flex w-full text-sm font-semibold">
            <div style={{ width: `${percent}%` }} className="min-w-min pr-1">
              {min}
            </div>
            {internalValue !== min && internalValue !== max && (
              <div>{internalValue}</div>
            )}
            <div
              style={{ width: `${100 - percent}%` }}
              className="min-w-min pl-1 text-right"
            >
              {max}
            </div>
          </div>
        )}
        <AntdSlider
          {...restProps}
          trackStyle={{ backgroundColor: Color.PRIMARY, ...trackStyle }}
          handleStyle={{
            backgroundColor: disabled ? "#BBBBBB" : Color.PRIMARY,
            border: 0,
            width: "24px",
            height: "24px",
            marginTop: "-10px",
            ...handleStyle
          }}
          tooltipVisible={false}
          value={internalValue}
          onChange={internalOnChange}
        />
      </div>
    </FormItem>
  );
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  showNum: true
};
