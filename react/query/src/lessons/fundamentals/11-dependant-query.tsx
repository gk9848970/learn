import { useQuery } from "@tanstack/react-query";

const fetchPost = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  return data;
};

const fetchUser = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = await response.json();
  return data;
};

const usePosts = (id: string) =>
  useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

const useUser = (id: string) =>
  useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
    enabled: id !== undefined,
  });

export function DependantQuery() {
  const post = usePosts("1");
  const user = useUser(post.data?.userId);

  if (post.isError) {
    return <div>Error</div>;
  }

  if (post.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <p>{post.data.body}</p>
      <div>{user.isLoading && "Loading"}</div>
      {user.data && <div>{user.data.name}</div>}
    </div>
  );
}

const usePostWithUser = (id: string) => {
  const post = usePosts(id);
  const user = useUser(post.data?.userId);

  return { post, user };
};

export function DependantQueryCleanedCode() {
  const { post, user } = usePostWithUser("1");

  if (post.isError) {
    return <div>Error</div>;
  }

  if (post.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <p>{post.data.body}</p>
      <div>{user.isLoading && "Loading"}</div>
      {user.data && <div>{user.data.name}</div>}
    </div>
  );
}

const usePostWithUserCombined = (id: string) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const post = await fetchPost(id);
      const user = await fetchUser(post.userId);
      return { post, user };
    },
  });

export const DependantQueryCombined = () => {
  const { data, isError, isLoading } = usePostWithUserCombined("1");

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <p>{data?.post.body}</p>
      {data?.user && <div>{data?.user.name}</div>}
    </div>
  );
};
