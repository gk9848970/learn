import { QueryObserver } from "@tanstack/query-core";
import { useEffect, useState } from "react";

export function useQuery(options, client) {
  const defaultedOptions = client.defaultQueryOptions(options);

  // Needed to make sure results are optimistically set in fetching state before subscribing or updating options
  defaultedOptions._optimisticResults = "optimistic";

  const [observer] = useState(
    () => new QueryObserver(client, defaultedOptions)
  );

  // Get the initial optimistic result
  const [result, setResult] = useState(() =>
    observer.getOptimisticResult(defaultedOptions)
  );

  useEffect(() => {
    // Set up subscription to observer changes
    const unsubscribe = observer.subscribe(() => {
      // Update result to current results
      setResult(observer.getCurrentResult());
    });

    return unsubscribe;
  }, [observer]);

  return result;
}
