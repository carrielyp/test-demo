import { createContext } from "react";

export interface ResponsiveProps {
  sm: boolean;
}

export const ResponsiveContext = createContext<ResponsiveProps>({
  sm: false
});
