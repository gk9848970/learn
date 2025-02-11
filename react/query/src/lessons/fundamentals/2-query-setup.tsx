import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { InfiniteQuery } from "./17-infinite-query";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <InfiniteQuery />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
