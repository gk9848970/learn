"use client";

import { fetchPaginatedPosts } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function PostsWithQueryPagination({
  page = 1,
}: {
  page?: number;
}) {
  const posts = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPaginatedPosts(page),
  });

  if (posts.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
