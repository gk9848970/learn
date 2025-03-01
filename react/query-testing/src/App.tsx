import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostComponent } from "./posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostComponent postId={1} />
    </QueryClientProvider>
  );
}

export default App;
