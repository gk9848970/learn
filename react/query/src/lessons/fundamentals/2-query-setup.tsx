import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistingQueriesExperimental } from "./37-persisting-queries-experimental";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <PersistingQueriesExperimental />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
