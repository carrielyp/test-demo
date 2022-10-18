import type { DividerProps as AntdDividerProps } from "antd/lib/divider";
import AntdDivider from "antd/lib/divider";
import React from "react";

export type DividerProps = AntdDividerProps & {
  noPadding?: boolean;
};

export const Divider = ({ noPadding, ...restProps }: DividerProps) => (
  <AntdDivider
    {...restProps}
    className={
      restProps.className + `${noPadding ? " divider-no-padding" : ""}`
    }
  />
);

Divider.defaultProps = {
  type: "horizontal",
  orientation: "center",
  dashed: false
};
