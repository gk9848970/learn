import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Deduplication } from "./deduplication";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Deduplication />
    </QueryClientProvider>
  );
}
