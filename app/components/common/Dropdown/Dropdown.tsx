import type { DropDownProps as AntdDropDownProps } from "antd/lib/dropdown";
import AntdDropdown from "antd/lib/dropdown";
import type { ReactNode } from "react";

export type DropdownProps = AntdDropDownProps & {
  children: ReactNode;
  borderClassName?: string;
};

export const Dropdown = ({
  visible,
  arrow,
  overlayClassName,
  borderClassName,
  ...props
}: DropdownProps) => (
  <AntdDropdown
    {...props}
    {...(visible !== null && { visible })}
    overlayClassName={`bg-white ${
      arrow
        ? "shadow-md"
        : borderClassName
        ? `${borderClassName}`
        : "border-neutral-20 border border-solid"
    } ${overlayClassName || ""}`}
  />
);

Dropdown.defaultProps = {
  trigger: ["click"],
  arrow: false,
  placement: "bottom"
};
