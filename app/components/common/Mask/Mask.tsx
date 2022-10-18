import type { CSSProperties, ReactNode } from "react";

export interface MaskProps {
  enabled: boolean;
  className?: string;
  style?: CSSProperties;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  overlay?: ReactNode;
  overlayCentered?: boolean;
  children: ReactNode;
}

export const Mask = ({
  enabled,
  className,
  style,
  containerClassName,
  containerStyle,
  overlay,
  overlayCentered,
  children
}: MaskProps) => (
  <div
    className={`relative ${containerClassName || ""}`}
    style={containerStyle}
  >
    {enabled && (
      <div
        className={`absolute z-9999 h-full w-full ${
          overlayCentered ? "flex items-center justify-center" : ""
        } ${className || ""}`}
        style={style}
      >
        {overlay}
      </div>
    )}
    <div className={`h-full w-full ${enabled ? "opacity-50" : ""}`}>
      {children}
    </div>
  </div>
);

Mask.defaultProps = {
  enabled: true
};
