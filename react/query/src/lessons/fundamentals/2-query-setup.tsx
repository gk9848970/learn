import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Mutations } from "./18-mutations";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Mutations />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
