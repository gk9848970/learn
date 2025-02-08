import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  // ParallelQueryStatic1,
  // ParallelQueryStatic2,
  // ParallelQueryStatic3,
  ParallelQueryStatic4,
} from "./12-parallel-query-static";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <ParallelQueryStatic4 />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
