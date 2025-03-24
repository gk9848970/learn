import { QueryObserver } from "@tanstack/query-core";
import { useState, useSyncExternalStore } from "react";

export function useQuery(options, client) {
  const defaultedOptions = client.defaultQueryOptions(options);

  // Needed to make sure results are optimistically set in fetching state before subscribing or updating options
  defaultedOptions._optimisticResults = "optimistic";

  const [observer] = useState(
    () => new QueryObserver(client, defaultedOptions)
  );

  // Get the initial optimistic result
  const result = observer.getOptimisticResult(defaultedOptions);

  useSyncExternalStore(observer.subscribe, () => observer.getCurrentResult());

  return result;
}
