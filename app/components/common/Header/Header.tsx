import { Header as AntdHeader } from "antd/lib/layout/layout";
import { CSSProperties, ReactNode, Fragment, useRef, useState } from "react";

import {
  CaretsUpDown,
  Dropdown,
  Icon,
  SimpleMenu,
  Badge,
  Collapsible
} from "..";
import { ResponsiveSize } from "../../../constants/design-system";
import { useWindowSize } from "../../../hooks/getWindowSize";
import { usePagePadding } from "../../../hooks/usePagePadding";
import { useLayoutEffect } from "../../../hooks/useLayoutEffect";
import { StringUtil } from "../../../utils";

export interface HeaderMenuProps {
  key: string;
  title: ReactNode;
  count?: number;
  onClick?: () => void;
}

export interface HeaderMainMenuProps extends HeaderMenuProps {
  subMenu?: HeaderMenuProps[];
}

export interface HeaderSecondaryMenuProps extends HeaderMenuProps {
  active?: boolean;
}

export interface HeaderBrand {
  logo?: { visible?: boolean; value?: ReactNode };
  divisionName?: { visible?: boolean; value?: string };
  onClick?: () => void;
}

export interface HeaderProps {
  className?: string;
  style?: CSSProperties;
  brand?: HeaderBrand;
  user?: {
    name?: string;
  };
  onLogout?: () => void;
  mainMenu?: HeaderMainMenuProps[];
  settingsMenu?: HeaderMenuProps[];
  activeMenu?: string;
}

export const Header = ({
  className,
  style,
  brand,
  user = {}, // new to ssnet
  onLogout,
  mainMenu,
  settingsMenu,
  activeMenu
}: HeaderProps) => {
  const { headerFooterPx } = usePagePadding();
  const { responsiveSize, windowHeight } = useWindowSize();
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
  const [menuState, setMenuState] = useState<"dropdown" | "menu" | "drawer">(
    "menu"
  );
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [mainMenuDropdownVisible, setMainMenuDropdownVisible] = useState(false);
  const [drawerBodyVisible, setDrawerBodyVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState<Record<string, boolean>>(
    {}
  );
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (responsiveSize === undefined || responsiveSize < ResponsiveSize.SM) {
      setMainHeaderHeight(56);
      setMenuState("drawer");
    } else if (responsiveSize >= ResponsiveSize.LG) {
      setMainHeaderHeight(68);
      setMenuState("menu");
    } else {
      setMainHeaderHeight(56);
      setMenuState("dropdown");
    }
  }, [responsiveSize]);

  const renderMenuItem = (title: ReactNode, id?: string) => (
    <div id={id} className="flex h-full flex-col justify-center">
      <div className="flex items-center space-x-2 text-sm font-semibold">
        <div className="flex items-center space-x-1">
          <div>{title}</div>
        </div>
      </div>
    </div>
  );

  const renderMainMenu = () => {
    if (!mainMenu?.length) {
      return null;
    }

    return (
      <div
        id="headerMainMenu"
        className="flex h-full flex-wrap items-center px-3"
      >
        {mainMenu.map(({ key, title, count, onClick, subMenu }) => (
          <div
            key={key}
            className={`h-full cursor-pointer border-0 border-b-2 border-solid px-3 pt-0.5
              text-primary transition duration-500
              ${
                key === activeMenu ||
                subMenu?.some(({ key }) => key === activeMenu)
                  ? "border-primary"
                  : "border-transparent"
              }`}
            onClick={subMenu ? undefined : onClick}
          >
            {renderMenuItem(title, count)}
          </div>
        ))}
      </div>
    );
  };

  const renderMainMenuDropdown = () => {
    let menu = mainMenu ? [...mainMenu] : [];

    if (!menu.length) {
      return null;
    }

    let selectedTitle;

    menu = menu.filter((item) => {
      if (item.key === activeMenu) {
        selectedTitle = item.title;

        return false;
      }

      return true;
    });

    return (
      <Dropdown
        getPopupContainer={() =>
          document.getElementById("headerMainMenu") || document.body
        }
        overlay={<SimpleMenu menu={menu} active={activeMenu} />}
        onVisibleChange={setMainMenuDropdownVisible}
        placement="bottomLeft"
        trigger={["hover", "click"]}
      >
        <div
          id="headerMainMenu"
          className="mb-0.5 flex"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex items-center space-x-2 whitespace-nowrap text-sm font-semibold text-primary">
            <span>{selectedTitle}</span>
            <CaretsUpDown size={12} up={mainMenuDropdownVisible} />
          </div>
        </div>
      </Dropdown>
    );
  };

  const renderMainMenuDrawer = () => {
    return (
      <div
        className="flex cursor-pointer items-center justify-center"
        style={{
          height: mainHeaderHeight,
          width: mainHeaderHeight,
          marginLeft: -headerFooterPx,
          marginRight: -headerFooterPx + 8
        }}
        onClick={() => setDrawerBodyVisible(!drawerBodyVisible)}
      >
        {drawerBodyVisible ? (
          <Icon.Cross size={18} className="text-primary" />
        ) : (
          <Icon.Menu size={18} className="text-primary" />
        )}
      </div>
    );
  };

  const updateSubMenuVisible = (newState: Record<string, boolean>) => {
    setSubMenuVisible((prevState) => ({ ...prevState, ...newState }));
  };

  const renderDrawer = () => {
    const top = headerRef.current
      ? headerRef.current.offsetTop + headerRef.current.clientHeight - 2
      : 0;

    const settingsSubMenu = [...(settingsMenu || [])];

    if (user && onLogout) {
      settingsSubMenu.push({
        key: "logout",
        title: "Log Out"
        // onClick: () => setLogoutVisible(true)
      });
    }

    return (
      <Collapsible
        expanded={drawerBodyVisible}
        className={`absolute z-10 w-full ${
          drawerBodyVisible ? "bg-black bg-opacity-60" : ""
        }`}
        style={{
          top,
          height: drawerBodyVisible ? windowHeight - top : undefined,
          backdropFilter: drawerBodyVisible ? "blur(10px)" : undefined
        }}
      >
        <div
          className="overflow-y-auto shadow"
          style={{ maxHeight: windowHeight - top - 105 }}
        >
          {renderDrawerMenu(mainMenu)}
        </div>
      </Collapsible>
    );
  };

  const renderDrawerMenu = (menu?: HeaderMainMenuProps[]) => (
    <>
      {menu?.map(({ key, title, count, onClick, subMenu }) => (
        <Fragment key={key}>
          <div
            className={`
              flex cursor-pointer items-center justify-between space-x-1 border-0 border-b
              border-solid border-neutral-30 py-3 px-4
              ${activeMenu === key ? "bg-blue-20" : "bg-white"}
            `}
            onClick={
              subMenu
                ? () => updateSubMenuVisible({ [key]: !subMenuVisible[key] })
                : onClick
            }
          >
            <div>{title}</div>
            <div className="flex items-center space-x-2">
              {!!count && <Badge count={count} />}
              {subMenu && <CaretsUpDown size={12} up={!!subMenuVisible[key]} />}
            </div>
          </div>

          {subMenu && (
            <Collapsible expanded={!!subMenuVisible[key]}>
              {subMenu.map(({ key, title, count, onClick }) => (
                <div
                  key={key}
                  className={`
                    flex cursor-pointer items-center space-x-1 border-0 border-b border-solid border-neutral-30
                    py-3 pr-4 pl-8
                    ${activeMenu === key ? "bg-blue-20" : "bg-neutral-20"}
                  `}
                  onClick={onClick}
                >
                  <div>{title}</div>
                  {!!count && <Badge count={count} />}
                </div>
              ))}
            </Collapsible>
          )}
        </Fragment>
      ))}
    </>
  );

  const renderSettingsMenu = () => {
    const menu = settingsMenu ? [...settingsMenu] : [];

    if (user && onLogout) {
      menu.push({
        key: "logout",
        title: "Log Out"
        // onClick: () => setLogoutVisible(true)
      });
    }

    if (!menu.length) {
      if (user) {
        return (
          <div className="whitespace-nowrap text-sm font-semibold text-primary">
            {StringUtil.truncate(user.name, 20)}
          </div>
        );
      }

      return null;
    }

    return (
      <Dropdown
        getPopupContainer={() =>
          document.getElementById("headerMainMenu") || document.body
        }
        overlay={<SimpleMenu menu={menu} active={activeMenu} />}
        onVisibleChange={setSettingsVisible}
        trigger={["hover", "click"]}
      >
        <div id="headerMainMenu" className="mb-0.5 flex">
          <div className="flex items-center space-x-2 whitespace-nowrap text-sm font-semibold text-primary">
            <span>
              {user ? StringUtil.truncate(user.name, 20) : "Settings"}
            </span>
            <CaretsUpDown size={12} up={settingsVisible} />
          </div>
        </div>
      </Dropdown>
    );
  };

  const renderLogo = () => (
    <div className="flex flex-col items-center space-x-0">
      {brand?.logo?.visible !== false && brand?.logo?.value}
      {brand?.divisionName?.visible !== false && (
        <div className="-ml-2 text-xs font-semibold text-primary">
          {brand?.divisionName?.value}
        </div>
      )}
    </div>
  );

  const renderPrimaryHeader = () => (
    <div className="flex h-full items-center space-x-4 md:space-x-6">
      {menuState === "drawer" && renderMainMenuDrawer()}
      {renderLogo()}
      {menuState === "dropdown" && renderMainMenuDropdown()}
      {menuState === "menu" && (
        <div className={`h-full`}>{renderMainMenu()}</div>
      )}

      <div className="flex flex-1 items-center justify-end space-x-4 md:space-x-6">
        <Icon.Search size={20} className="text-primary" />
        <Badge count={1}>
          <Icon.Bell size={20} className="text-neutral-60" />
        </Badge>
        {renderSettingsMenu()}
      </div>
    </div>
  );

  return (
    <div className={className}>
      <div ref={headerRef}>
        <AntdHeader
          className="bg-white shadow"
          style={{
            paddingLeft: headerFooterPx,
            paddingRight: headerFooterPx,
            ...style
          }}
        >
          {renderPrimaryHeader()}
        </AntdHeader>
      </div>

      {drawerBodyVisible && renderDrawer()}
    </div>
  );
};
