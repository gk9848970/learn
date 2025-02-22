import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const postSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    views: z.number(),
  })
);

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();
      return postSchema.parse(data);
    },
  });

  return query;
};

export const QueryDataValidation = () => {
  const posts = usePosts();

  return (
    <div>
      <h1>Query Data Validation</h1>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <div>
          <ul>
            {posts.data.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.views}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
