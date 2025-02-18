import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PerformanceOptimisations } from "./22-performance-optimisations";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <PerformanceOptimisations />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
