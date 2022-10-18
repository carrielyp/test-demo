import React from "react";
import type { IconBaseProps } from "../Icon/IconBase";
import { Icon } from "..";

export type CaretsUpDownProps = IconBaseProps & {
  up?: boolean;
};

export const CaretsUpDown = ({ up, ...props }: CaretsUpDownProps) =>
  up ? <Icon.CaretsUp {...props} /> : <Icon.CaretsDown {...props} />;
