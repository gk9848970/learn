import { fetchPosts, Post } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function PostsWithQuery({
  initialData,
}: {
  initialData: Post[];
}) {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialData,
  });

  return (
    <ul>
      {posts.data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
