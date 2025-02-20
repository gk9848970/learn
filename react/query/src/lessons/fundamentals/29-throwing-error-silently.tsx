import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

const usePosts = () => {
  const countRef = useRef(0);

  return useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      if (countRef.current > 2) {
        throw new Error(
          "This is an error inside react query from main component"
        );
      }
      countRef.current += 1;
      return "Gaurav";
    },
    throwOnError: (_error, query) => {
      return query.state.data === undefined;
    },
  });
};

export const ThrowingErrorSilently = () => {
  const posts = usePosts();
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Throwing on Error Silently</h1>
      <button
        onClick={() => queryClient.refetchQueries({ queryKey: ["posts"] })}
      >
        Refetch
      </button>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && <div>{posts.data}</div>}
    </div>
  );
};
