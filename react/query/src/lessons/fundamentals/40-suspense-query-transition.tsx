import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState, useTransition } from "react";

const PER_PAGE_LIMIT = 8;

const fetchPaginatedPosts = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PER_PAGE_LIMIT}`
  );
  const data = await response.json();
  return data;
};

const usePosts = (page: number) => {
  return useSuspenseQuery({
    queryKey: ["posts", page],
    queryFn: async () => fetchPaginatedPosts(page),
  });
};

const Component = () => {
  const [page, setPage] = useState(5);
  const posts = usePosts(page);
  const [isPreviousData, startTransition] = useTransition();

  useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted");
    };
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      <ul style={{ opacity: isPreviousData ? 0.5 : 1 }}>
        {posts.data.map((post) => (
          <li key={post.id}>
            <div>Title: {post.title}</div>
          </li>
        ))}
      </ul>
      <div>Page: {page}</div>

      <div>
        <button
          disabled={isPreviousData || page === 1}
          onClick={() => startTransition(() => setPage(page - 1))}
        >
          Previous
        </button>
        <button
          disabled={
            isPreviousData ||
            (posts.isSuccess && posts.data.length < PER_PAGE_LIMIT)
          }
          onClick={() => startTransition(() => setPage(page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

/*
Here unlike previous example, 
As our suspense responds to a input. Not wrapping it in a Suspense component. Will throw an error.

Interestingly even if we are showing fallback, Our component is not unmounted.
Maybe just hidden in memory by react
 */

export const SuspenseQueriesTransition = () => {
  return (
    <div>
      <h1>Posts</h1>

      <Suspense fallback={<div>Loading... Posts</div>}>
        <Component />
      </Suspense>
    </div>
  );
};
