import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from ".";

const queryClient = new QueryClient();

export function QueryContext() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
