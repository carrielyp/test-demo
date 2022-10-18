import { useState } from "react";
import { ResponsiveSize } from "../constants/design-system";
import { useLayoutEffect } from "./useLayoutEffect";

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
  responsiveSize: ResponsiveSize;
}

const isClient = typeof window === "object";

/**
 * Hook that tells you window size.
 *
 * @returns window size
 */
export const useWindowSize = () => {
  const getSize = (): WindowSize => {
    const windowWidth = isClient ? window.innerWidth : 0;
    const windowHeight = isClient ? window.innerHeight : 0;

    let responsiveSize: ResponsiveSize | undefined;

    if (windowWidth >= ResponsiveSize.XXL) {
      responsiveSize = ResponsiveSize.XXL;
    } else if (windowWidth >= ResponsiveSize.XL) {
      responsiveSize = ResponsiveSize.XL;
    } else if (windowWidth >= ResponsiveSize.LG) {
      responsiveSize = ResponsiveSize.LG;
    } else if (windowWidth >= ResponsiveSize.MD) {
      responsiveSize = ResponsiveSize.MD;
    } else if (windowWidth >= ResponsiveSize.SM) {
      responsiveSize = ResponsiveSize.SM;
    } else if (windowWidth >= ResponsiveSize.XS) {
      responsiveSize = ResponsiveSize.XS;
    } else {
      responsiveSize = ResponsiveSize.XXS;
    }

    return { windowWidth, windowHeight, responsiveSize };
  };

  const [windowSize, setWindowSize] = useState(getSize());

  useLayoutEffect(() => {
    // // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state

      const windowWidth = isClient ? window.innerWidth : 0;
      const windowHeight = isClient ? window.innerHeight : 0;

      let responsiveSize: ResponsiveSize | undefined;

      if (windowWidth >= ResponsiveSize.XXL) {
        responsiveSize = ResponsiveSize.XXL;
      } else if (windowWidth >= ResponsiveSize.XL) {
        responsiveSize = ResponsiveSize.XL;
      } else if (windowWidth >= ResponsiveSize.LG) {
        responsiveSize = ResponsiveSize.LG;
      } else if (windowWidth >= ResponsiveSize.MD) {
        responsiveSize = ResponsiveSize.MD;
      } else if (windowWidth >= ResponsiveSize.SM) {
        responsiveSize = ResponsiveSize.SM;
      } else if (windowWidth >= ResponsiveSize.XS) {
        responsiveSize = ResponsiveSize.XS;
      } else {
        responsiveSize = ResponsiveSize.XXS;
      }

      setWindowSize({ windowWidth, windowHeight, responsiveSize });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};
