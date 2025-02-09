import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PlaceholderData } from "./15-placeholder-data";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlaceholderData />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
