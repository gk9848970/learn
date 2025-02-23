import { NetworkMode, useQuery } from "@tanstack/react-query";

const usePosts = (networkMode: NetworkMode) => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      return data;
    },
    networkMode,
  });

  return query;
};

const useComments = (networkMode: NetworkMode) => {
  const query = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/comments");
      const data = await response.json();
      return data;
    },
    networkMode,
  });

  return query;
};

const useMagicNumber = (networkMode: NetworkMode) => {
  const query = useQuery({
    queryKey: ["magicNumber"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(42);
        }, 2000);
      });
    },
    networkMode,
  });

  return query;
};

export const OfflineSupportQuery = () => {
  const comments = useComments("online");
  const posts = usePosts("offlineFirst");
  const magicNumber = useMagicNumber("always");

  return (
    <div>
      <h1>Offline support query</h1>
      <h2>Posts</h2>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isPaused && <div>Paused</div>}
      {posts.isSuccess && <div>Success</div>}

      <h2>Comments</h2>
      {comments.isLoading && <div>Loading</div>}
      {comments.isError && <div>Error</div>}
      {comments.isPaused && <div>Paused</div>}
      {comments.isSuccess && <div>Success</div>}

      <h2>Magic Number</h2>
      {magicNumber.isLoading && <div>Loading</div>}
      {magicNumber.isError && <div>Error</div>}
      {magicNumber.isPaused && <div>Paused</div>}
      {magicNumber.isSuccess && <div>Success</div>}
    </div>
  );
};
