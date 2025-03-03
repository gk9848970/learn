"use client";

import { fetchPaginatedPosts, Post } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function PostsWithQueryPagination({
  initialData,
  page = 1,
}: {
  initialData?: Post[];
  page?: number;
}) {
  const posts = useQuery({
    queryKey: ["posts", page],
    queryFn: () => {
      console.log("Ran");
      return fetchPaginatedPosts(page);
    },
    initialData: () => {
      console.log("Ran2");
      return initialData;
    },
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
