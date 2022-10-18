import { Spin } from "../Spin";
import type { MaskProps } from "./Mask";
import { Mask } from "./Mask";

export type ActivityIndicatorMaskProps = Omit<
  MaskProps,
  "overlay" | "overlayCentered"
>;

export const ActivityIndicatorMask = ({
  className,
  ...props
}: ActivityIndicatorMaskProps) => (
  <Mask
    {...props}
    className={`bg-black opacity-25 ${className || ""}`}
    overlay={<Spin />}
    overlayCentered
  />
);
