import { useQuery } from "../adapter/use-query";

export const Posts = () => {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
  });

  console.log({
    error: posts.isError,
    data: posts.data,
    isLoading: posts.isLoading,
  });

  if (posts.isLoading) return <div>Loading</div>;
  if (posts.isError) return <div>Error</div>;

  return (
    <div>
      <h1>Posts</h1>
      {posts.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
