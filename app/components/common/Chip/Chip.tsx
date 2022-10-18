import type { CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";
import { Icon } from "..";

export interface ChipProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: () => void;
  onDismiss?: () => void;
  disabled?: boolean;
  active?: boolean;
  error?: string;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>((props, ref) => {
  const {
    className,
    style,
    children,
    onClick,
    onDismiss,
    disabled,
    active,
    error
  } = props;

  return (
    <button
      ref={ref}
      className={`
        inline-block h-9 rounded-3xl border border-solid px-4 text-sm font-semibold
        ${
          disabled
            ? "border-neutral-40"
            : error
            ? "border-red-40"
            : "border-blue-10"
        }
        ${
          disabled
            ? active
              ? "bg-neutral-30 text-neutral-40"
              : "bg-neutral-10 text-neutral-40"
            : active
            ? "bg-primary text-white"
            : "bg-blue-10 text-neutral-60"
        }
        ${disabled ? "cursor-not-allowed" : onClick ? "cursor-pointer" : ""}
        ${className || ""}
      `}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex h-full items-center">
        <div>{children}</div>
        {onDismiss && (
          <Icon.CrossCircle
            className={`ml-4 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            size={16}
            onClick={
              disabled
                ? undefined
                : (e) => {
                    onDismiss();
                    e.stopPropagation();
                  }
            }
          />
        )}
      </div>
    </button>
  );
});

Chip.displayName = "Chip";
