import { Footer as AntdFooter } from "antd/lib/layout/layout";
import type { CSSProperties } from "react";
import { usePagePadding } from "../../../hooks/usePagePadding";

export interface FooterLink {
  title: string;
  href?: string;
  newTab?: boolean;
  onClick?: () => void;
}

export interface FooterProps {
  className?: string;
  style?: CSSProperties;
  left?: FooterLink[];
  right?: FooterLink[];
}

export const Footer = ({
  className,
  style,
  left = [],
  right = []
}: FooterProps) => {
  const { headerFooterPx } = usePagePadding();

  return (
    <AntdFooter
      className={`flex flex-col space-y-1 border-0 border-t border-solid border-primary px-0 pt-5 pb-11 sm:flex-row sm:space-y-0 ${
        className || ""
      }`}
      style={{
        marginLeft: headerFooterPx,
        marginRight: headerFooterPx,
        ...style
      }}
    >
      <div className="flex flex-col space-y-1 text-center sm:block sm:space-y-0 sm:space-x-8 sm:text-left">
        {left.map((link, i) => (
          <a
            key={i}
            className="text-xs font-semibold text-primary"
            href={link.href}
            onClick={link.onClick}
            {...(link.newTab && { target: "_blank", rel: "noreferrer" })}
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className="flex flex-1 flex-col space-y-1 text-center sm:block sm:flex-row sm:space-y-0 sm:space-x-8 sm:text-right">
        {right.map((link, i) => (
          <a
            key={i}
            className="text-xs font-semibold text-primary"
            href={link.href}
            onClick={link.onClick}
            {...(link.newTab && { target: "_blank", rel: "noreferrer" })}
          >
            {link.title}
          </a>
        ))}
      </div>
    </AntdFooter>
  );
};
