import type {
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps
} from "antd/lib/collapse";
import AntdCollapse from "antd/lib/collapse";
import type { ReactNode } from "react";
import React from "react";

export type CollapseProps = AntdCollapseProps & {
  children?: ReactNode;
};

export type CollapsePanelProps = AntdCollapsePanelProps & {
  children?: ReactNode;
};

export const Collapse = (props: CollapseProps) => <AntdCollapse {...props} />;

export const CollapsePanel = (props: CollapsePanelProps) => (
  <AntdCollapse.Panel {...props} />
);

Collapse.defaultProps = {
  accordion: true,
  expandIconPosition: "start"
};

CollapsePanel.defaultProps = {
  showArrow: true
};
