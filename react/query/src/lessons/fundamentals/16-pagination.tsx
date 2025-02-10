import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const PER_PAGE_LIMIT = 8;

const fetchPaginatedPosts = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PER_PAGE_LIMIT}`
  );
  const data = await response.json();
  return data;
};

const getPostsQueryOptions = (page: number) => {
  return {
    queryKey: ["posts", page],
    queryFn: async () => {
      const response = await fetchPaginatedPosts(page);
      return response;
    },
    staleTime: 10 * 1000,
  };
};

const usePosts = (page: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      ...getPostsQueryOptions(page + 1),
    });
  }, [queryClient, page]);

  return useQuery({
    ...getPostsQueryOptions(page),
    placeholderData: (previousData) => {
      return previousData;
    },
  });
};

export const Pagination = () => {
  const [page, setPage] = useState(1);

  const posts = usePosts(page);

  return (
    <div>
      <h1>Posts</h1>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <ul style={{ opacity: posts.isPlaceholderData ? 0.5 : 1 }}>
            {posts.data.map((post) => (
              <li key={post.id}>
                <div>Title: {post.title}</div>
              </li>
            ))}
          </ul>
          <div>Page: {page}</div>
        </>
      )}
      <div>
        <button
          disabled={posts.isPlaceholderData || page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          disabled={
            posts.isPlaceholderData ||
            (posts.isSuccess && posts.data.length < PER_PAGE_LIMIT)
          }
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
