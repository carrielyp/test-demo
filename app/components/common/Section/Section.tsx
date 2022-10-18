import type { CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";
import { useResponsiveContext } from "../../../hooks/useResponsiveContext";
import { H1, H2 } from "../Heading";

export interface SectionProps {
  className?: string;
  style?: CSSProperties;
  title: ReactNode;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  subTitle?: ReactNode;
  subTitleClassName?: string;
  subTitleStyle?: CSSProperties;
  rightLink?: {
    text: string;
    action: () => void;
  };
  rightButtons?: ReactNode | ReactNode[];
  children: ReactNode;
  titleRight?: ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (props, ref) => {
    const {
      className,
      style,
      title,
      titleClassName,
      titleStyle,
      subTitle,
      subTitleClassName,
      subTitleStyle,
      rightLink,
      children,
      titleRight
    } = props;
    let { rightButtons } = props;

    if (!rightButtons) {
      rightButtons = [];
    }

    if (!Array.isArray(rightButtons)) {
      rightButtons = [rightButtons];
    }

    const { sm } = useResponsiveContext();

    const hasRightButton =
      (rightButtons as ReactNode[]).filter((button) => button).length > 0;
    const titleContainerAlignment = hasRightButton
      ? "items-center"
      : sm
      ? "items-baseline"
      : "items-end";
    const titleContainerClassName = `${titleContainerAlignment} ${
      sm ? "mb-4" : "mb-2"
    }`;
    const rightLinkClassName = sm
      ? "text-base font-semibold"
      : "ml-4 mt-2 whitespace-nowrap";
    const Header = sm ? H1 : H2;

    return (
      <div ref={ref} className={className} style={style}>
        <div className={`mb-4 flex justify-between ${titleContainerClassName}`}>
          <div>
            <div className="inline-flex">
              <Header className={titleClassName} style={titleStyle}>
                {title}
              </Header>
              {titleRight}
            </div>
            {subTitle && (
              <div
                className={`text-sm ${subTitleClassName || ""}`}
                style={subTitleStyle}
              >
                {subTitle}
              </div>
            )}
          </div>
          <div className="-mt-2 flex flex-1 flex-wrap items-center justify-end">
            {rightLink && (
              <a className={rightLinkClassName} onClick={rightLink.action}>
                {rightLink.text}
              </a>
            )}
            {(rightButtons as ReactNode[]).map((button, i) => (
              <div key={i} className="ml-4 mt-2">
                {button}
              </div>
            ))}
          </div>
        </div>
        {children}
      </div>
    );
  }
);
