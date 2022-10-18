import type { CSSProperties, ReactNode } from "react";
import { Menu, MenuItem } from "../Menu";

export interface SimpleMenuProps {
  className?: string;
  style?: CSSProperties;
  menu: {
    key?: string;
    title: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    labelClassName?: string;
  }[];
  active?: string;
}

export const SimpleMenu = ({
  className,
  style,
  menu,
  active
}: SimpleMenuProps) => {
  const getItems = () => {
    return menu.map(({ key, title, onClick, disabled, labelClassName }) => {
      return {
        key,
        disabled,
        onClick,
        className: disabled ? "bg-neutral-30" : "",
        style: { minHeight: "40px", height: "100%" },
        label: (
          <a
            className={`text-sm ${
              disabled ? "text-neutral-40" : "text-neutral-60"
            } ${labelClassName}`}
          >
            {title}
          </a>
        )
      };
    }) as MenuItem[];
  };

  return (
    <Menu
      className={className}
      style={style}
      selectedKeys={active ? [active] : []}
      items={getItems()}
    />
  );
};
