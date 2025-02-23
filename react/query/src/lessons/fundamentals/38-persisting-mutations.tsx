import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API = "http://localhost:3000/posts";

export const togglePostRead = async (id: number, newValue: boolean) => {
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
      return await togglePostRead(id, newValue);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(API);
      const data = await response.json();
      return data;
    },
  });

  return query;
};

export const PersistingMutations = () => {
  const posts = usePosts();
  const mutation = usePostMutation();

  return (
    <div>
      <h1>Persisting mutations</h1>
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
