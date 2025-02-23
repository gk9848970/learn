import { useQuery } from "@tanstack/react-query";

const API = "http://localhost:3000/posts";

const delayPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await delayPromise(5000);
      const response = await fetch(API);
      const data = await response.json();
      return data;
    },
    meta: {
      persist: true,
    },
  });

  return query;
};

const useComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      await delayPromise(5000);
      const response = await fetch("http://localhost:3000/comments");
      const data = await response.json();
      return data;
    },
  });
};

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await delayPromise(5000);
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      return data;
    },
  });
};

const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      await delayPromise(5000);
      throw new Error("Failed to fetch todos");
    },
    meta: {
      persist: true,
    },
  });
};

export const PersistingQueries = () => {
  const posts = usePosts();
  const comments = useComments();
  const users = useUsers();
  const todos = useTodos();

  return (
    <div>
      <h1>Persisting queries</h1>
      <h2>Posts</h2>

      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isPaused && <div>Paused</div>}
      {posts.isSuccess && (
        <div>
          {posts.data.map((i) => (
            <div style={{ display: "flex", gap: 10 }} key={i.id}>
              <input disabled checked={i.read} type="checkbox" />
              <div>{i.title}</div>
            </div>
          ))}
        </div>
      )}

      <h2>Comments</h2>
      {comments.isLoading && <div>Loading</div>}
      {comments.isError && <div>Error</div>}
      {comments.isPaused && <div>Paused</div>}
      {comments.isSuccess && (
        <div>
          {comments.data.map((i) => (
            <div style={{ display: "flex", gap: 10 }} key={i.id}>
              <div>{i.text}</div>
            </div>
          ))}
        </div>
      )}

      <h2>Users</h2>
      {users.isLoading && <div>Loading</div>}
      {users.isError && <div>Error</div>}
      {users.isPaused && <div>Paused</div>}
      {users.isSuccess && (
        <div>
          {users.data.map((i) => (
            <div style={{ display: "flex", gap: 10 }} key={i.id}>
              <div>
                {i.name} | {i.email}
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Todos</h2>
      {todos.isLoading && <div>Loading</div>}
      {todos.isError && <div>Error</div>}
      {todos.isSuccess && <div>Todo's successfully fetched</div>}
    </div>
  );
};
