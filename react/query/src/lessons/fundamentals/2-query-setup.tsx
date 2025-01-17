import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GarbageCollection } from "./9-garbage-collection";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <GarbageCollection />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
