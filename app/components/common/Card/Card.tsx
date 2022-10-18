import type { CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";
import { H3 } from "../Heading";
import * as Icon from "../Icon";
import { SimpleMenu } from "../SimpleMenu";
import { Spin } from "../Spin";
import { Dropdown } from "../Dropdown";

export interface CardProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  dropdownOptions?: { title: string; onClick?: () => void }[];
  children: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  highlightOnHover?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// eslint-disable-next-line react/display-name
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    id,
    className,
    style,
    title,
    dropdownOptions,
    footer,
    loading,
    highlightOnHover,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = props;

  return (
    <div
      id={id}
      ref={ref}
      className={`
        rounded-lg bg-white
        ${loading ? "relative" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${
          highlightOnHover
            ? "border border-solid border-white transition hover:border-purple-40 hover:bg-purple-10"
            : ""
        }
        ${className || ""}
      `}
      style={{
        boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.2)",
        ...style
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading && (
        <div className="absolute top-0 left-0 z-40 h-full w-full rounded-lg bg-white opacity-50">
          <Spin center />
        </div>
      )}
      {title ? (
        <>
          <div className="border-t-0 border-b border-l-0 border-r-0 border-solid border-neutral-30">
            <div className="relative flex items-center justify-between p-4">
              <H3 className="text-neutral-60">{title}</H3>
              {dropdownOptions && (
                <Dropdown
                  overlay={
                    <SimpleMenu
                      className="min-w-[190px]"
                      menu={dropdownOptions}
                    />
                  }
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <div className="absolute right-2 flex h-9 w-9 cursor-pointer items-center justify-center">
                    <Icon.EllipsisV size={20} className=" text-neutral-50" />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="p-4">{children}</div>
          {footer}
        </>
      ) : (
        children
      )}
    </div>
  );
});
