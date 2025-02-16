import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

const API = "http://localhost:3000/posts";

const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await fetch(`${API}/${id}`);
      return response.json();
    },
  });
};

const useModifyPost = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const response = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      return response.json();
    },
    onSuccess: (data, title, context) => {
      console.log("Post updated! hook", data, title, context);
      /* 
      If data has whole object that we need
      queryClient.setQueryData(["post", id], data);
      */

      /* 
      If we only have what we passed to mutation function
      queryClient.setQueryData(["post", id], (oldData) =>
        oldData
          ? {
              ...oldData,
              title,
            }
          : oldData
      );
      */

      // Or we can just invalidate the query
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};

export function Mutations() {
  const ref = useRef<HTMLInputElement>(null);
  const post = usePost(1);
  const modifyPost = useModifyPost(1);

  const handleChange = (title: string) => {
    modifyPost.mutate(title, {
      onSuccess: (data, title, context) => {
        console.log("Post updated! mutate", data, title, context);
      },
    });
  };

  return (
    <div>
      <h1>Mutations</h1>
      <p>Mutations are used to update data on the server.</p>

      {post.isLoading && <p>Loading...</p>}
      {post.isError && <p>Error: {post.error.message}</p>}
      {post.data && (
        <>
          <div>
            <div>{post.data.title}</div>
          </div>
          <input ref={ref} />
          <button onClick={() => handleChange(ref.current?.value || "")}>
            Change
          </button>
        </>
      )}
    </div>
  );
}
