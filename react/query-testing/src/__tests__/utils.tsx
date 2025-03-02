import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export const renderWithQueryClient = (
  ui: React.ReactElement,
  data: [string[], unknown][] = []
) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  data.forEach(([key, value]) => {
    testQueryClient.setQueryData(key, value);
  });

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
};
