import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // @ts-expect-error New any error
    if (!response.ok) throw new Error("Failed to fetch posts");
    const data = await response.json();
    return data;
  } catch (err) {
    // @ts-expect-error New any error
    throw new Error("Failed to fetch posts", err);
  }
};

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // @ts-expect-error New any error
      if (!response.ok) throw new Error("Failed to fetch posts");

      return response.json();
    },
  });

const usePostsWithFetch = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

const Loading = () => {
  return <div>Loading...</div>;
};

const Error = () => {
  return <div>Oops! Error</div>;
};

export function FetchData() {
  const { data, isPending, isError } = usePosts();

  if (isPending) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      {data.map((post: any) => (
        <Fragment key={post.id}>
          <div>{post.body}</div>
          <div>----------------</div>
        </Fragment>
      ))}
    </div>
  );
}
