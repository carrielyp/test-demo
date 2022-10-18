import type { CSSProperties, ReactNode } from "react";
import React from "react";
import { Collapse, CollapsePanel } from "..";

export interface CollapsibleProps {
  className?: string;
  style?: CSSProperties;
  expanded: boolean;
  children: ReactNode;
}

const PANEL_KEY = "PANEL_KEY";

export const Collapsible = ({
  className,
  style,
  expanded,
  children
}: CollapsibleProps) => (
  <Collapse
    className={`collapsible ${className || ""}`}
    style={style}
    ghost
    activeKey={expanded ? PANEL_KEY : undefined}
  >
    <CollapsePanel
      key={PANEL_KEY}
      className="p-0"
      showArrow={false}
      header={null}
    >
      {children}
    </CollapsePanel>
  </Collapse>
);
