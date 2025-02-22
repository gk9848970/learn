import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OffineSupportQuery } from "./34-offine-support-query";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <OffineSupportQuery />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
