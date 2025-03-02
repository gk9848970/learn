import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostEditComponent } from "./posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostEditComponent postId={1} />
    </QueryClientProvider>
  );
}

export default App;
