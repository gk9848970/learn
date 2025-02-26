import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SuspenseQueriesLifeCycle } from "./39-suspense-query-lifecycle";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <div>Error occured: {error.message}</div>}
    >
      <QueryClientProvider client={queryClient}>
        <SuspenseQueriesLifeCycle />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
