import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Pagination } from "./16-pagination";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pagination />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
