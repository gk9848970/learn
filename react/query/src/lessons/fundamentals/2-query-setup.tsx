import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DataSyncAndStaleTime } from "./7-data-sync";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataSyncAndStaleTime />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
