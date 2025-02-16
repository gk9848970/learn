import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryDefaults } from "./20-query-defaults";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

queryClient.setQueryDefaults(["posts"], {
  staleTime: 10 * 1000,
});

queryClient.setQueryDefaults(["users"], {
  staleTime: 20 * 1000,
});

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryDefaults />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
