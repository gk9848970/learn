import { QueryClient } from "@tanstack/query-core";
import { PostsOriginal } from "./components/posts-original";
import { QueryClientProvider } from "./vendor/react-query/src/QueryClientProvider";

const queryClient = new QueryClient();

export const AppOriginal = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsOriginal />
    </QueryClientProvider>
  );
};
