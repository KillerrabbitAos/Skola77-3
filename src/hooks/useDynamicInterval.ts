import { useEffect, useRef } from "react";

type Step = [number, number];
/**
 * A custom React hook that executes a callback function at dynamically adjustable intervals.
 * The interval duration can change based on a series of steps provided as input.
 *
 * @param callback - The function to be executed at each interval.
 * @param steps - An array of steps where each step is a tuple. The first element of the tuple
 *                is the fetch count threshold, and the second element is the new interval duration
 *                (in milliseconds) to be applied when the threshold is reached.
 * @param initialInterval - The initial interval duration in milliseconds. Defaults to 5000ms.
 *
 * @example
 * ```typescript
 * const steps: Step[] = [
 *   [3, 2000], // Change interval to 2000ms after 3 executions
 *   [5, 1000], // Change interval to 1000ms after 5 executions
 * ];
 * useDynamicInterval(() => {
 *   console.log('Callback executed');
 * }, steps, 5000);
 * ```
 *
 * @remarks
 * - The hook uses `setInterval` internally to manage the timing of the callback execution.
 * - The interval duration is updated dynamically based on the `steps` array.
 * - The hook ensures that the previous interval is cleared before setting a new one.
 *
 * @returns void
 */
export function useDynamicInterval(
  callback: () => void,
  steps: Step[],
  initialInterval = 5000
) {
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const fetchCountRef = useRef(0);
  const currentIntervalRef = useRef(initialInterval);

  useEffect(() => {
    const run = () => {
      callback();
      fetchCountRef.current++;

      const step = steps.find(
        ([threshold]) => fetchCountRef.current === threshold
      );
      if (step) {
        currentIntervalRef.current = step[1];
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
        intervalIdRef.current = setInterval(run, currentIntervalRef.current);
      }
    };

    intervalIdRef.current = setInterval(run, currentIntervalRef.current);
    run();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);
}