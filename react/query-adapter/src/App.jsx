import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "./adapter/query-client-provider";
import { PostsOriginal } from "./components/posts-original";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [show, setShow] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {show && <PostsOriginal />}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </QueryClientProvider>
  );
}

export default App;
