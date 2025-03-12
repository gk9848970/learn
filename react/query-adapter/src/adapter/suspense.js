export const defaultThrowOnError = (_error, query) =>
  query.state.data === undefined;

export const ensureSuspenseTimers = (defaultedOptions) => {
  const originalStaleTime = defaultedOptions.staleTime;
  if (defaultedOptions.suspense) {
    // Handle staleTime to ensure minimum 1000ms in Suspense mode
    // This prevents unnecessary refetching when components remount after suspending
    defaultedOptions.staleTime =
      typeof originalStaleTime === "function"
        ? (...args) => Math.max(originalStaleTime(...args), 1000)
        : Math.max(originalStaleTime ?? 1000, 1000);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1000);
    }
  }
};

export const willFetch = (result) => result.isLoading && result.isFetching;

export const shouldSuspend = (defaultedOptions, result) =>
  defaultedOptions?.suspense && result.isPending;

export const fetchOptimistic = (defaultedOptions, observer) =>
  observer.fetchOptimistic(defaultedOptions);
