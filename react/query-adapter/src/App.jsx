import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "./adapter/query-client-provider";
import { Posts } from "./components/posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
}

export default App;
