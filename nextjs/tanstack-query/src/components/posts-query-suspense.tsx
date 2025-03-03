"use client";

import { fetchPaginatedPosts } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function PostsWithQuerySuspense({
  page = 1,
}: {
  page?: number;
}) {
  const posts = useSuspenseQuery({
    queryKey: ["posts", page],
    queryFn: () => {
      console.log("fetching posts for page", page);
      return fetchPaginatedPosts(page);
    },
  });

  return (
    <ul>
      {posts.data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
