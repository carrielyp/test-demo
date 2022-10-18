import { useMemo, useState } from "react";
import { ResponsiveSize } from "../constants/design-system";
import { useWindowSize } from "./getWindowSize";
import { useLayoutEffect } from "./useLayoutEffect";

/**
 * Hook that tells you what padding to be used for a page, depending on the window size and according to GatherSG design system.
 *
 * @returns x, paddingTop(pt) & paddingButtom(pb) padding in pixel
 */
export const usePagePadding = () => {
  const { responsiveSize } = useWindowSize();
  const [px, setPx] = useState(0);
  const pt = 24;
  const pb = 80;
  const isXLSize =
    responsiveSize === undefined || responsiveSize >= ResponsiveSize.XL;

  useLayoutEffect(() => {
    if (isXLSize) {
      setPx(0);
    } else if (responsiveSize >= ResponsiveSize.LG) {
      setPx(24);
    } else {
      setPx(16);
    }
  }, [isXLSize, responsiveSize]);

  const headerFooterPx = useMemo(() => {
    if (isXLSize) {
      return 40;
    }

    return Math.min(40, px);
  }, [px, isXLSize]);

  return { px, pt, pb, headerFooterPx };
};
