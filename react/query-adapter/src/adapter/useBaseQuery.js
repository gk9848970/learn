import * as React from "react";

import { isServer, notifyManager } from "@tanstack/query-core";

import {
  ensureSuspenseTimers,
  fetchOptimistic,
  shouldSuspend,
  willFetch,
} from "./suspense";

function noop() {}

import { useQueryClient } from "./query-client-provider";

export function useBaseQuery(options, Observer, queryClient) {
  if (typeof options !== "object" || Array.isArray(options)) {
    throw new Error(
      'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
    );
  }

  const client = useQueryClient(queryClient);

  const defaultedOptions = client.defaultQueryOptions(options);

  client
    .getDefaultOptions()
    .queries?._experimental_beforeQuery?.(defaultedOptions);

  if (!defaultedOptions.queryFn) {
    console.error(
      `[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
    );
  }

  // Make sure results are optimistically set in fetching state before subscribing or updating options
  defaultedOptions._optimisticResults = "optimistic";

  ensureSuspenseTimers(defaultedOptions);

  // this needs to be invoked before creating the Observer because that can create a cache entry
  const isNewCacheEntry = !client
    .getQueryCache()
    .get(defaultedOptions.queryHash);

  const [observer] = React.useState(
    () => new Observer(client, defaultedOptions)
  );

  // note: this must be called before useSyncExternalStore
  const result = observer.getOptimisticResult(defaultedOptions);

  const shouldSubscribe = options.subscribed !== false;
  React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe
          ? observer.subscribe(notifyManager.batchCalls(onStoreChange))
          : noop;

        // Update result to make sure we did not miss any query updates
        // between creating the observer and subscribing to it.
        observer.updateResult();

        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );

  React.useEffect(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setOptions(defaultedOptions, { listeners: false });
  }, [defaultedOptions, observer]);

  // Handle suspense
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer);
  }

  client
    .getDefaultOptions()
    .queries?._experimental_afterQuery?.(defaultedOptions, result);

  if (
    defaultedOptions.experimental_prefetchInRender &&
    !isServer &&
    willFetch(result)
  ) {
    const promise = isNewCacheEntry
      ? // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        fetchOptimistic(defaultedOptions, observer)
      : // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        client.getQueryCache().get(defaultedOptions.queryHash)?.promise;

    promise?.catch(noop).finally(() => {
      // `.updateResult()` will trigger `.#currentThenable` to finalize
      observer.updateResult();
    });
  }

  // Handle result property usage tracking
  return !defaultedOptions.notifyOnChangeProps
    ? observer.trackResult(result)
    : result;
}
