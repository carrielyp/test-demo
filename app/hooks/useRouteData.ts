import { useMatches } from "@remix-run/react";

/**
 * Remix specific, access loader data of any route in the routes stack
 * example: root, routes/case/view, routes/case/view/client
 * @param routeId string
 * @returns route loader data
 */
export const useRouteData = <T>(routeId: string): T | undefined => {
  const matches = useMatches();
  const data = matches.find((match) => match.id === routeId)?.data;

  return data as T | undefined;
};
