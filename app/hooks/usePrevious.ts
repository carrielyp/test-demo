import { useEffect, useRef } from "react";

/**
 * Hook that keeps track of the previous value of a state.
 *
 * @param value initial value
 * @returns previous value
 */
export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
