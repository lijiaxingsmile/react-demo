import { useEffect } from "react";

export default function useAsyncEffect(effect, deps) {
  return useEffect(() => {
    let canceled = false;
    effect(() => canceled);
    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
