import type { BadgeProps as AntdBadgeProps } from "antd/lib/badge";
import AntdBadge from "antd/lib/badge";
import type { ReactNode } from "react";
import React from "react";

export type BadgeProps = AntdBadgeProps & {
  children?: ReactNode;
};

export const Badge = ({ className, style, size, ...props }: BadgeProps) => (
  <AntdBadge
    {...props}
    size={size}
    className={`badge-${size} ${className || ""}`}
    style={{ boxShadow: "none", ...style }}
  />
);

Badge.defaultProps = {
  size: "default"
};
