import type { TagProps } from "..";
import { Tag } from "..";

export type PillProps = TagProps;

export const Pill = ({ className, ...props }: PillProps) => (
  <Tag className={`rounded-full ${className || ""}`} {...props} />
);

Pill.defaultProps = {
  color: "primary"
};
