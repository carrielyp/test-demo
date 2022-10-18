import type { TooltipProps } from "..";
import { Icon, Tooltip } from "..";

export type InfoTooltipProps = Omit<
  TooltipProps,
  "children" | "type" | "titleText"
>;

export const InfoTooltip = ({ title, ...props }: InfoTooltipProps) => (
  <Tooltip
    {...props}
    type="primary"
    title={<div className="p-3 text-sm">{title}</div>}
  >
    <Icon.InfoCircle className="ml-1 mt-1.5 h-4 flex-shrink-0 cursor-pointer text-primary" />
  </Tooltip>
);

InfoTooltip.defaultProps = {
  placement: "bottom"
};
