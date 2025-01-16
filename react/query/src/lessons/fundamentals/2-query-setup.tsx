import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryDependancy } from "./6-query-dependancy";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryDependancy />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
