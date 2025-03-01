import { useQuery } from "@tanstack/react-query";

export const PostComponent = ({ postId }: { postId: number }) => {
  const post = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return await response.json();
    },
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
