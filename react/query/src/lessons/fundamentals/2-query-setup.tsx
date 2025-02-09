import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Prefetching } from "./13-prefetching";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Prefetching />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
