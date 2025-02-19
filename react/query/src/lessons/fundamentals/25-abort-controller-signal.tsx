import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const usePosts = (id: string) =>
  useQuery({
    queryKey: ["posts", id],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`,
        { signal }
      );
      const data = await response.json();
      return data;
    },
    enabled: Boolean(id),
  });

export const AbortControllerSignal = () => {
  const [search, setSearch] = useState("");
  const posts = usePosts(search);

  return (
    <div>
      <h1>Abort Controller Signal</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && <div>Success</div>}
    </div>
  );
};
