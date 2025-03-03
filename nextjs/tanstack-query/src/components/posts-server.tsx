import { fetchPosts } from "@/api";

export default async function PostsWithServer() {
  const posts = await fetchPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
