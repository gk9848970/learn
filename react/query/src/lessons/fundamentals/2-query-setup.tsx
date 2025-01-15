import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FetchData } from "./5-fetch-with-fetch";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchData />
    </QueryClientProvider>
  );
}
