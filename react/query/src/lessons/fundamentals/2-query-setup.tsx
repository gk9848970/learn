import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { SuspenseQueriesTransition } from "./40-suspense-query-transition";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <div>Error occured: {error.message}</div>}
    >
      <QueryClientProvider client={queryClient}>
        <SuspenseQueriesTransition />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
