import type {
  TooltipPlacement,
  TooltipProps as AntdTooltipProps
} from "antd/lib/tooltip";
import AntdTooltip from "antd/lib/tooltip";
import type { ReactNode } from "react";
import { Color } from "../../../constants/design-system";

type ToolTipType = "primary";

export type TooltipProps = Omit<AntdTooltipProps, "title"> & {
  color?: null;
  type?: ToolTipType;
  placement: TooltipPlacement;
  arrowless?: boolean;
  title?: ReactNode;
  titleText?: string;
};

export const Tooltip = ({
  type,
  placement,
  align,
  visible,
  arrowless,
  overlayClassName,
  title,
  titleText,
  ...props
}: TooltipProps) => {
  if (!title) {
    title = <div />;

    if (titleText) {
      title = <div className="px-3 py-2 text-sm">{titleText}</div>;
    }
  }

  if (arrowless && !align) {
    if (placement.startsWith("bottom")) {
      align = { offset: [0, -5] };
    } else if (placement.startsWith("top")) {
      align = { offset: [0, 5] };
    } else if (placement.startsWith("right")) {
      align = { offset: [-5, 0] };
    } else if (placement.startsWith("left")) {
      align = { offset: [5, 0] };
    }
  }

  return (
    <AntdTooltip
      {...props}
      color={type === "primary" ? Color.PRIMARY : "white"}
      placement={placement}
      align={align || { offset: [0, 0] }}
      {...(visible === undefined ? {} : { visible })}
      overlayClassName={`max-w-none ${arrowless ? "arrowless" : ""} ${
        overlayClassName || ""
      }`}
      title={title}
    />
  );
};

Tooltip.defaultProps = {
  placement: "bottom"
};
