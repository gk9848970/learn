import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PollingData } from "./10-polling-data";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <PollingData />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
