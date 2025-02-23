import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API = "http://localhost:3000/posts";

const delayPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const togglePostRead = async (id: number, newValue: boolean) => {
  const response = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ read: newValue }),
  });

  return await response.json();
};

const usePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: async ({ id, newValue }: { id: number; newValue: boolean }) => {
      await delayPromise(id * 5000);
      return await togglePostRead(id, newValue);
    },
    onMutate: async ({ id, newValue }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const snapshot = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (oldData) =>
        oldData.map((i) => (i.id === id ? { ...i, read: newValue } : i))
      );
      return () => {
        queryClient.setQueryData(["posts"], snapshot);
      };
    },
    onError: (_error, _variables, rollback: any) => {
      rollback?.();
    },
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: ["posts"] }) === 1) {
        return queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });
};

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await delayPromise(10000);
      const response = await fetch(API);
      const data = await response.json();
      return data;
    },
  });

  return query;
};

export const OfflineSupportMutation = () => {
  const posts = usePosts();
  const mutation = usePostMutation();

  return (
    <div>
      <h1>Offline support mutation</h1>
      <h2>Posts</h2>

      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isPaused && <div>Paused</div>}
      {posts.isSuccess && (
        <div>
          {posts.data.map((i) => (
            <div style={{ display: "flex", gap: 10 }} key={i.id}>
              <input
                checked={i.read}
                type="checkbox"
                onChange={(e) => {
                  mutation.mutate({ id: i.id, newValue: e.target.checked });
                }}
              />
              <div>{i.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
