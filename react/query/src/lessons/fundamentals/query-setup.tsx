import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Lifecycle } from "./lifecycle";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <Lifecycle />
    </QueryClientProvider>
  );
}
