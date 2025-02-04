import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  // DependantQuery,
  // DependantQueryCleanedCode,
  DependantQueryCombined,
} from "./11-dependant-query";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <DependantQuery /> */}
      {/* <DependantQueryCleanedCode /> */}
      <DependantQueryCombined />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
