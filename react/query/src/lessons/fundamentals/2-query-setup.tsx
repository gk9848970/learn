import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReferentialStability } from "./24-referential-stability";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReferentialStability />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
