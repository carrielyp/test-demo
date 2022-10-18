import type { CSSProperties, ReactNode } from "react";
// import { MultilineText } from '../MultilineText/MultilineText';

export interface InputErrorMessageProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export const InputErrorMessage = ({
  className,
  style,
  children
}: InputErrorMessageProps) => (
  <div className={`block text-sm text-red-40 ${className || ""}`} style={style}>
    {/* {typeof children === 'string' ? <MultilineText>{children}</MultilineText> : children} */}
    {children}
  </div>
);
