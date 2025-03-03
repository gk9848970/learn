import { fetchPosts } from "@/api";
import PostsWithQuery from "@/components/posts-query";

// See page source
export default async function Home() {
  const posts = await fetchPosts();

  return <PostsWithQuery initialData={posts} />;
}
