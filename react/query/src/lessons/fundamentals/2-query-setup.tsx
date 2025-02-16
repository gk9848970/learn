import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OptimisticUpdates } from "./19-optimistic-updates";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <OptimisticUpdates />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
