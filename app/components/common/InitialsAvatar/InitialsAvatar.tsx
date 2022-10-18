import type { CSSProperties } from "react";
import { Avatar, Icon } from "..";

export interface InitialsAvatarProps {
  className?: string;
  hoverClassName?: string;
  style?: CSSProperties;
  name?: string;
  onDismiss?: () => void;
  inactive?: boolean;
  icon?: "tick" | "cross";
}

export const InitialsAvatar = ({
  className,
  hoverClassName,
  style,
  name,
  onDismiss,
  inactive,
  icon
}: InitialsAvatarProps) => {
  let initials = "?";

  if (name) {
    initials = name
      .split(" ")
      .slice(0, 2)
      .map((e) => e[0])
      .join("");
  }

  let CustomIcon: any = null;
  let iconClassName = "";

  switch (icon) {
    case "tick":
      CustomIcon = Icon.TickCircle;
      iconClassName = "text-green-40";
      break;
    default:
      CustomIcon = Icon.CrossCircle;
      iconClassName = "text-red-40";
  }

  return (
    <div className={`flex ${className || ""}`} style={style}>
      <Avatar
        className={`font-semibold ${
          inactive ? "text-neutral-10" : "text-white"
        } bg-primary ${hoverClassName}`}
      >
        <span className="text-sm uppercase">{initials}</span>
      </Avatar>
      {onDismiss && (
        <CustomIcon
          className={`${iconClassName} z-10 -mt-0.5 -ml-2.5 cursor-pointer hover:opacity-75`}
          size={12}
          onClick={onDismiss}
        />
      )}
    </div>
  );
};

InitialsAvatar.defaultProps = {
  icon: "cross"
};
