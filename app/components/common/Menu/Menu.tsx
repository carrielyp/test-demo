import type { MenuProps as AntdMenuProps } from "antd/lib/menu";
import type { ItemType } from "antd/lib/menu/hooks/useItems";
import AntdMenu from "antd/lib/menu";
import { Icon } from "..";

export type MenuProps = AntdMenuProps;
export type MenuItem = ItemType;

export const Menu = (props: MenuProps) => (
  <AntdMenu
    overflowedIndicator={<Icon.Ellipsis className="align-[-4px]" size={20} />}
    {...props}
  />
);
