import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import toast from "react-hot-toast";
import { ErrorConfigs } from "./32-error-configs";

// Opinionated Config, Which throws error if data is not there and otherwise shows a toast only once per query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (_error, query) => {
        return query.state.data === undefined;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(error.message);
      }
    },
  }),
});

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
            <ErrorConfigs />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
