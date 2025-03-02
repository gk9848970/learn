import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

export const PostComponent = ({ postId }: { postId: number }) => {
  const [id, setId] = useState(postId);

  const post = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return await response.json();
    },
  });

  return (
    <div>
      <h1>Post</h1>
      <button onClick={() => setId(id + 1)}>Next Post</button>
      {post.isLoading && <div>Loading</div>}
      {post.isError && <div>Error</div>}
      {post.isSuccess && (
        <>
          <h2>{post.data.postId}</h2>
          <ul>
            <li>{post.data.title}</li>
            <li>{post.data.body}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export const PostEditComponent = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const post = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return await response.json();
    },
  });

  const editPost = useMutation({
    mutationFn: async (data: { title: string }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
  });

  return (
    <div>
      <h1>Post</h1>
      {post.isLoading && <div>Loading</div>}
      {post.isError && <div>Error</div>}
      {post.isSuccess && (
        <>
          <h2>{post.data.postId}</h2>
          <ul>
            <li>{post.data.title}</li>
            <li>{post.data.body}</li>
          </ul>
          <div>
            <input role="textbox" type="text" ref={inputRef} />
            <button
              onClick={() => {
                if (inputRef.current) {
                  editPost.mutate({ title: inputRef.current.value });
                }
              }}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};
