import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";

export interface EmailProps {
  className?: string;
  style?: CSSProperties;
  clickable?: boolean;
  children: string;
}

export const Email = ({ className, style, clickable, children }: EmailProps) =>
  clickable === false ? (
    <span className={`text-primary ${className || ""}`} style={style}>
      {children}
    </span>
  ) : (
    <a
      className={twMerge("text-blue-40", className)}
      style={style}
      href={`mailto:${children}`}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
