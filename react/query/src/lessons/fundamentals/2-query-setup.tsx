import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { InitialData } from "./14-initial-data";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <InitialData />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
