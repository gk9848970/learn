import { useQuery } from "@tanstack/react-query";
import { experimental_createPersister } from "@tanstack/react-query-persist-client";

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
    persister: experimental_createPersister({
      storage: window.localStorage,
    }),
  });

  return query;
};

const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      await delayPromise(5000);
      throw new Error("Failed to fetch todos");
    },
    persister: experimental_createPersister({
      storage: window.localStorage,
    }),
  });
};

export const PersistingQueriesExperimental = () => {
  const posts = usePosts();
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

      <h2>Todos</h2>
      {todos.isLoading && <div>Loading</div>}
      {todos.isError && <div>Error</div>}
      {todos.isSuccess && <div>Todo's successfully fetched</div>}
    </div>
  );
};
