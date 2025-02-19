import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Retries } from "./26-retries";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Retries />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
