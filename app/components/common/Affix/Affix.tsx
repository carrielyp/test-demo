import { Affix as AntdAffix } from "antd";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  targetId?: string;
  offsetTopPosition?: number;
  offsetTopWithMargin?: number;
}

export const Affix = (props: Props) => {
  const { targetId, offsetTopPosition, children, offsetTopWithMargin } = props;

  const [offSetTop, setOffSetTop] = useState(offsetTopPosition || 0);

  useEffect(() => {
    if (targetId) {
      const targetIdTop =
        document.querySelector(`#${targetId}`)?.getBoundingClientRect()
          .height || 0;

      if (offsetTopWithMargin) {
        setOffSetTop(targetIdTop + offsetTopWithMargin);
      } else {
        setOffSetTop(targetIdTop);
      }
    }
  }, [targetId, setOffSetTop, offsetTopWithMargin]);

  return <AntdAffix offsetTop={offSetTop}>{children}</AntdAffix>;
};
