import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const PostComponent = ({ postId }: { postId: number }) => {
  const [id, setId] = useState(postId);

  const post = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return await response.json();
    },
  });

  return (
    <div>
      <h1>Post</h1>
      <button onClick={() => setId(id + 1)}>Next Post</button>
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
