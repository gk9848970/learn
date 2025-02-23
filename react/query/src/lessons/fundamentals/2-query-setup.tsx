import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OfflineSupportMutation } from "./35-offline-support-mutation";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <OfflineSupportMutation />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
