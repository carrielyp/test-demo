import type { ButtonProps as AntButtonProps } from "antd/lib/button";
import AntdButton from "antd/lib/button";
import Spin from "antd/lib/spin";

type ButtonType = "primary" | "secondary" | "danger-outline" | "text";

export type ButtonProps = Omit<AntButtonProps, "type"> & {
  type?: ButtonType;
  loading?: boolean;
  iconAlignment?: "start" | "end";
};

export const Button = ({
  className,
  style,
  size = "middle",
  loading,
  children,
  type = "primary",
  icon,
  iconAlignment,
  disabled,
  ...props
}: ButtonProps) => {
  const classNames = {
    primary:
      "button-solid bg-primary border-primary text-white hover:bg-blue-800 hover:border-blue-800 active:bg-primary active:border-primary active:shadow-inner-md",
    secondary:
      "button-outline bg-white border-primary text-primary active:shadow-inner-md",
    "danger-outline":
      "button-outline text-red-40 bg-white border-red-40 hover:bg-red-40 hover:text-white active:shadow-inner-md",
    text: "button-text text-primary bg-transparent hover:text-blue-800 active:text-primary"
  };

  const typeToUse =
    type === "danger-outline" ? "ghost" : type === "text" ? "text" : "primary";

  const sizeClassName = size === "small" ? "text-sm" : "text-base";

  let processedClassName = `box-border ${
    type === "text" ? "px-0" : "px-4"
  } rounded-lg font-semibold ${classNames[type]} ${sizeClassName} ${
    className || ""
  }`;

  if (loading) {
    processedClassName = `${processedClassName} opacity-50`;
    icon = <Spin className={size === "small" ? "small" : ""} size="small" />;
    disabled = true;
  }

  let height = 48;

  if (size === "large") {
    height = 56;
  } else if (size === "small") {
    height = 36;
  }

  return (
    <AntdButton
      {...props}
      className={processedClassName}
      style={{ height, ...style }}
      disabled={disabled}
      type={typeToUse}
      size={size}
      icon={undefined}
      loading={false}
    >
      <div className="flex h-full items-center justify-center">
        <div
          className={`flex justify-center ${
            size === "small" ? "text-xs" : "text-sm"
          } ${iconAlignment === "end" ? "order-last" : "order-start"}`}
        >
          {icon}
        </div>
        <div
          className={
            icon && children ? (iconAlignment === "end" ? "mr-2" : "ml-2") : ""
          }
        >
          {children}
        </div>
      </div>
    </AntdButton>
  );
};
