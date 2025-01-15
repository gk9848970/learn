import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryDependancy } from "./6-query-dependancy";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryDependancy />
    </QueryClientProvider>
  );
}
