import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AbortControllerSignal } from "./25-abort-controller-signal";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <AbortControllerSignal />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
