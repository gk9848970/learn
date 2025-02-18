import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  return data.splice(0, 5);
};

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

export const PerformanceOptimisations = () => {
  const queryClient = useQueryClient();
  const posts = usePosts();
  const [, forceUpdate] = useState(0);

  console.log("StructuralSharing");

  /*
  This will always have stable reference due to structural sharing, Hence will never run again.
  Even if component re-renders, It will not run again.
  */
  useEffect(() => {
    console.log("posts.data changed");
  }, [posts.data]);

  /*
  If the below useEffect is not there, then even on revalidation or refetching.
  The component will not re-render. As same data is fetched.
  And Observer need not to inform component, As nothing that "it uses" has changed.
  This is because of queries being tracked queries.
  */
  useEffect(() => {
    console.log("posts.isFetching changed");
  }, [posts.isFetching]);

  return (
    <div>
      <h1>Structural Sharing</h1>
      <button onClick={() => posts.refetch()}>Refetch</button>
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
      >
        Invalidate
      </button>
      <button onClick={() => forceUpdate((i) => i + 1)}>Force Update</button>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <ul>
            {posts.data.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
