import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import type { ResponsiveProps } from "../../../context/ResponsiveContext";
import { useResponsiveContext } from "../../../hooks/useResponsiveContext";

export type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> &
  Partial<ResponsiveProps>;

export const Display = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const style = { fontSize: "3.5rem", lineHeight: "5.25rem" };

  return <h1 {...constructProps(props, sm, undefined, style)} />;
};

export const H1 = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const style = sm
    ? { fontSize: "1.375rem", lineHeight: "1.875rem" }
    : { fontSize: "2.25rem", lineHeight: "3.375rem" };

  return <h1 {...constructProps(props, sm, undefined, style)} />;
};

export const H2 = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const className = sm ? "text-lg leading-relaxed" : "text-2xl leading-9";

  return <h2 {...constructProps(props, sm, className)} />;
};

export const H3 = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const className = sm ? "text-base" : "text-lg leading-7";

  return <h3 {...constructProps(props, sm, className)} />;
};

export const H4 = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const className = "text-base leading-6";

  return <h4 {...constructProps(props, sm, className)} />;
};

export const H5 = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const className = "text-sm leading-5";

  return <h5 {...constructProps(props, sm, className)} />;
};

export const H6 = ({ sm, ...props }: HeadingProps) => {
  const responsive = useResponsiveContext();

  if (sm === undefined) {
    sm = responsive.sm;
  }

  const className = "text-xs leading-4";

  return <h6 {...constructProps(props, sm, className)} />;
};

const constructProps = (
  { className, style, ...props }: HeadingProps,
  sm?: boolean,
  customClassName?: string,
  customStyle?: CSSProperties
) => ({
  className: `m-0 ${sm ? "font-bold" : "font-extrabold"} ${
    customClassName || ""
  } ${className || ""}`,
  style: { color: "inherit", ...customStyle, ...style },
  ...props
});
