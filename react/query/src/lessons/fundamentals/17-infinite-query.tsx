import { useInfiniteQuery } from "@tanstack/react-query";

const PER_PAGE_LIMIT = 22;

const fetchPaginatedPosts = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PER_PAGE_LIMIT}`
  );
  const data = await response.json();
  return data;
};

const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: 3,
    queryFn: async ({ pageParam }) => {
      const response = await fetchPaginatedPosts(pageParam);
      return response;
    },
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      if (_lastPage === undefined || _lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam === 1) return undefined;
      return firstPageParam - 1;
    },
    staleTime: 10 * 1000,
  });
};

export const InfiniteQuery = () => {
  const posts = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxHeight: 200,
              border: `2px solid pink`,
              overflow: "auto",
            }}
          >
            <button
              disabled={posts.hasPreviousPage === false}
              style={{ alignSelf: "flex-start" }}
              onClick={() => posts.fetchPreviousPage()}
            >
              Fetch More
            </button>
            {posts.data.pages.flat().map((post) => (
              <li style={{ border: "1px solid black" }} key={post.id}>
                <div>ID: {post.id}</div>
                <div>Title: {post.title}</div>
              </li>
            ))}
            <button
              disabled={posts.hasNextPage === false}
              style={{ alignSelf: "flex-start" }}
              onClick={() => posts.fetchNextPage()}
            >
              Fetch More
            </button>
          </ul>
        </>
      )}
    </div>
  );
};
