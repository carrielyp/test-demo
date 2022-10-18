import { useContext } from "react";
import { ResponsiveContext } from "../context/ResponsiveContext";

/**
 * Use responsive context.
 *
 * @returns responsive context
 */
export const useResponsiveContext = () => useContext(ResponsiveContext);
