import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  return data.splice(0, 5).map((post) => ({ ...post, time: Date.now() }));
};

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    select: (data) =>
      // You can even use React.useCallback here, If the selector is expensive
      data.map((post) => ({ id: post.id, title: post.title, body: post.body })),
  });

export const Selectors = () => {
  console.log("Selectors");
  const queryClient = useQueryClient();
  const posts = usePosts();
  const [, forceUpdate] = useState(0);

  return (
    <div>
      <h1>Selectors</h1>
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
