import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryDataValidation } from "./33-query-data-validation";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryDataValidation />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
