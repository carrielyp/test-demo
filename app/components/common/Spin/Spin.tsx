import type { SpinProps as AntdSpinProps } from "antd/lib/spin";
import AntdSpin from "antd/lib/spin";
import type { ReactNode } from "react";

export interface SpinProps extends AntdSpinProps {
  center?: boolean;
  children?: ReactNode;
}

export const Spin = ({ center, className, style, ...props }: SpinProps) => {
  if (center) {
    if (!className) {
      className = "";
    }

    className += " absolute top-1/2 left-1/2";

    if (!style) {
      style = {};
    }

    style = {
      ...style,
      msTransform: "translate(-50%, -50%)",
      transform: "translate(-50%, -50%)"
    };
  }

  return (
    <AntdSpin
      data-testid="spin"
      {...props}
      className={className}
      style={style}
    />
  );
};

Spin.defaultProps = {
  size: "default",
  spinning: true
};
