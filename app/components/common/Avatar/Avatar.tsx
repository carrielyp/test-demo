import AntdAvatar, { AvatarProps as AntdAvatarProps } from "antd/lib/avatar";
import React from "react";

export type AvatarProps = AntdAvatarProps;

export const Avatar = (props: AvatarProps) => <AntdAvatar {...props} />;

Avatar.defaultProps = {
  shape: "circle",
  size: "default"
};
