import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevicesComponent } from "./devices";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevicesComponent />
    </QueryClientProvider>
  );
}

export default App;
