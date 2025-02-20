import { useQuery } from "@tanstack/react-query";

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      console.log("Original query");
      throw new Error("This is an error inside react query");
    },
    throwOnError: true,
  });

const usePostsForError = () =>
  useQuery({
    queryKey: ["postsDuplicate"],
    queryFn: () => {
      console.log("Duplicate query");
      throw new Error(
        "This is an error inside react query from another component"
      );
    },
    throwOnError: true,
  });

const AnotherComponent = () => {
  const posts = usePostsForError();

  return (
    <div>
      <h1>Another Component</h1>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && <div>Success</div>}
    </div>
  );
};

export const ThrowingError = () => {
  const posts = usePosts();

  return (
    <div>
      <h1>Throwing on Error</h1>
      <AnotherComponent />
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && <div>Success</div>}
    </div>
  );
};
