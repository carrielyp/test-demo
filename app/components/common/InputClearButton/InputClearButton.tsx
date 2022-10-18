import type { CSSProperties } from "react";
import { Icon } from "..";

export interface InputClearButtonProps {
  className?: string;
  style?: CSSProperties;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  onClick?: () => void;
}

export const InputClearButton = ({
  className,
  style,
  iconClassName,
  iconStyle,
  onClick
}: InputClearButtonProps) => (
  <div onClick={onClick} className={className} style={style}>
    <Icon.CrossCircle
      size={16}
      className={`input-clear-button-icon cursor-pointer text-primary opacity-100 hover:opacity-75 ${
        iconClassName || ""
      }`}
      style={iconStyle}
    />
  </div>
);
