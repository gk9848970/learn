import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  return data.splice(0, 10);
};

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

export const Prefetching = () => {
  const posts = usePosts();
  const [selectedPost, setSelectedPost] = useState<number | undefined>(
    undefined
  );
  const queryClient = useQueryClient();

  if (selectedPost) {
    return (
      <>
        <button
          onClick={() => setSelectedPost(undefined)}
          style={{ padding: 10 }}
        >
          Back
        </button>
        <PostComponent postId={selectedPost} />
      </>
    );
  }

  if (posts.isLoading) {
    return <div>Loading</div>;
  }

  if (posts.isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.isError && <div>Error</div>}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "column",
          padding: 10,
        }}
      >
        {posts.isSuccess &&
          posts.data.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid black",
                padding: 10,
                cursor: "pointer",
              }}
              onMouseEnter={() => {
                queryClient.prefetchQuery({
                  queryKey: ["posts", post.id],
                  queryFn: async () => {
                    const response = await fetch(
                      `https://jsonplaceholder.typicode.com/posts/${post.id}`
                    );
                    return await response.json();
                  },
                  staleTime: 5000,
                });
              }}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <button
                onClick={() => setSelectedPost(post.id)}
                style={{ padding: 10 }}
              >
                Show Post
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

const PostComponent = ({ postId }: { postId: number }) => {
  const post = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return await response.json();
    },
    // Even if cached data is available, we want to refetch it on mount or not
    // refetchOnMount: false,
  });

  return (
    <div>
      <h1>Post</h1>
      {post.isLoading && <div>Loading</div>}
      {post.isError && <div>Error</div>}
      {post.isSuccess && (
        <>
          <h2>{post.data.postId}</h2>
          <ul>
            <li>{post.data.title}</li>
            <li>{post.data.body}</li>
          </ul>
        </>
      )}
    </div>
  );
};
