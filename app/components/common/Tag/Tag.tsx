import type { CSSProperties, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { TooltipProps } from "..";
import { Icon, Tooltip } from "..";

export type TagColor =
  | "custom"
  | "primary"
  | "black"
  | "white"
  | "gray"
  | "light-gray"
  | "green"
  | "red"
  | "blue"
  | "yellow";

export interface TagProps {
  className?: string;
  style?: CSSProperties;
  color: TagColor;
  solid?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  onDismiss?: () => void;
  wFull?: boolean;
  tooltip?: TooltipProps;
}

const hollowColor: Record<TagColor, string> = {
  custom: "",
  primary: "bg-blue-10 border-primary text-primary",
  black: "bg-neutral-20 border-neutral-60 text-neutral-60",
  white: "bg-white border-neutral-30 text-neutral-50",
  gray: "bg-neutral-10 border-neutral-50 text-neutral-50",
  "light-gray": "bg-neutral-10 border-neutral-40 text-neutral-40",
  green: "bg-green-10 border-green-50 text-green-50",
  red: "bg-red-10 border-red-50 text-red-50",
  blue: "bg-blue-10 border-blue-50 text-blue-50",
  yellow: "bg-yellow-10 border-yellow-50 text-yellow-50"
};

const solidColor: Record<TagColor, string> = {
  custom: "",
  primary: "bg-primary border-primary text-white",
  black: "bg-neutral-60 border-neutral-60 text-white",
  white: "bg-white border-white text-neutral-50",
  gray: "bg-neutral-50 border-neutral-50 text-white",
  "light-gray": "bg-neutral-30 border-neutral-30 text-neutral-50",
  green: "bg-green-50 border-green-50 text-white",
  red: "bg-red-50 border-red-50 text-white",
  blue: "bg-blue-40 border-blue-40 text-white",
  yellow: "bg-yellow-20 border-yellow-20 text-neutral-60"
};

export const Tag = ({
  className,
  style,
  color,
  children,
  onClick,
  solid,
  onDismiss,
  wFull,
  tooltip
}: TagProps) => {
  let colorClassName = "";

  if (solid) {
    colorClassName = solidColor[color];
  } else {
    colorClassName = hollowColor[color];
  }

  let onClickClassName = "";

  if (onClick) {
    onClickClassName = "cursor-pointer transition ";

    if (solid) {
      onClickClassName += "hover:opacity-90";
    } else {
      onClickClassName += "hover:opacity-70";
    }
  }

  const getTagComponent = () => (
    <div
      className={twMerge(
        "whitespace-nowrap rounded-md border-solid py-0.5 pl-2 pr-2 text-center text-sm font-semibold " +
          `${
            wFull ? "w-full" : "w-min"
          } ${colorClassName} ${onClickClassName} ${className || ""}`
      )}
      style={style}
      onClick={onClick}
    >
      <div className="flex h-full items-center justify-center">
        {children}
        {onDismiss && (
          <Icon.Cross
            size={8}
            className="ml-2 cursor-pointer"
            onClick={onDismiss}
          />
        )}
      </div>
    </div>
  );

  if (!tooltip) {
    return getTagComponent();
  }

  return <Tooltip {...tooltip}>{getTagComponent()}</Tooltip>;
};

Tag.defaultProps = {
  color: "primary"
};
