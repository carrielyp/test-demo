import React, { useEffect, useRef } from "react";
import { Spin } from "..";

export interface ActivityIndicatorProps {
  enabled: boolean;
  message?: string;
}

export const ActivityIndicator = ({
  enabled,
  message
}: ActivityIndicatorProps) => {
  const sentinelStartRef = useRef<HTMLDivElement>(null);
  const sentinelEndRef = useRef<HTMLDivElement>(null);
  const sentinelStyle = {
    width: 0,
    height: 0,
    overflow: "hidden",
    outline: "none"
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // keep focus inside this component
      if (enabled && (e.key === "Tab" || e.code === "Tab")) {
        const { activeElement } = document;
        const next = !e.shiftKey;

        if (next && activeElement === sentinelEndRef.current) {
          sentinelStartRef?.current?.focus();
        } else if (!next && activeElement === sentinelStartRef.current) {
          sentinelEndRef?.current?.focus();
        }
      }
    };

    if (enabled) {
      document.body.style.overflow = "hidden";

      sentinelStartRef.current?.focus();
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled]);

  return enabled ? (
    <div
      tabIndex={-1}
      className="activity-indicator fixed top-0 left-0 z-9999 block h-full w-full bg-black opacity-70"
    >
      <div
        tabIndex={0}
        ref={sentinelStartRef}
        style={sentinelStyle}
        aria-hidden="true"
      ></div>
      <Spin size="large" center tip={message} className="text-white" />
      <div
        tabIndex={0}
        ref={sentinelEndRef}
        style={sentinelStyle}
        aria-hidden="true"
      ></div>
    </div>
  ) : null;
};
