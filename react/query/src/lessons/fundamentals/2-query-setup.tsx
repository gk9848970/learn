import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FetchOnDemand } from "./8-fetch-on-demand";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchOnDemand />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
