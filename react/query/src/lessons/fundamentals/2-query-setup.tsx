import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Selectors } from "./23-selectors";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Selectors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
