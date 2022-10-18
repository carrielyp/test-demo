import type { ArgsProps, ConfigProps } from "antd/lib/notification";
import AntdNotification from "antd/lib/notification";
import type { ReactNode } from "react";
import { Icon } from "..";

export type NotificationConfigProps = ConfigProps;
export type NotificationProps = Omit<ArgsProps, "type" | "description"> & {
  type: "info" | "success" | "warning" | "error";
  title?: ReactNode;
};

export const Notification = {
  config: (config: ConfigProps) => {
    AntdNotification.config(config);
  },

  destroy: () => {
    AntdNotification.destroy();
  },

  close: (key: string) => {
    AntdNotification.close(key);
  },

  open: ({
    type,
    // duration = 0,
    duration = 10,
    className,
    title,
    message,
    ...props
  }: NotificationProps) => {
    let icon: ReactNode;
    let typeClassName: string;

    switch (type) {
      case "info":
        icon = (
          <Icon.LightBulbFilled className="mb-[3.5px] text-blue-40" size={14} />
        );
        typeClassName = "bg-blue-10 border-blue-40";
        break;

      case "success":
        icon = (
          <Icon.TickCircle className="mb-[3.5px] text-green-40" size={14} />
        );
        typeClassName = "bg-green-10 border-green-40";
        break;

      case "warning":
        icon = <Icon.Warning className="mb-[3.5px]" size={14} />;
        typeClassName = "bg-yellow-10 border-yellow-20";
        break;

      case "error":
        icon = (
          <Icon.ExclamationCircle
            className="mb-[3.5px] text-red-40"
            size={14}
          />
        );
        typeClassName = "bg-red-10 border-red-40";
        break;
    }

    AntdNotification.open({
      duration,
      icon,
      className: `${typeClassName} ${props.onClick ? "cursor-pointer" : ""} ${
        className || ""
      }`,
      message: title,
      description: message,
      ...props
    });
  }
};
