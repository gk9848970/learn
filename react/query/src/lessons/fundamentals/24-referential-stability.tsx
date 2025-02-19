import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchPosts = async () => {
  const response = await fetch(`http://localhost:3000/posts`);
  const data = await response.json();
  return data;
};

const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

export const ReferentialStability = () => {
  console.log("ReferentialStability");
  const queryClient = useQueryClient();
  const posts = usePosts();
  const [, forceUpdate] = useState(0);

  const post1 = posts.data?.[0];
  const post2 = posts.data?.[1];

  const post1Address = post1?.address;
  const post2Address = post2?.address;

  useEffect(() => {
    console.log("posts.data changed");
  }, [posts.data]);

  useEffect(() => {
    console.log("1st post changed");
  }, [post1]);

  useEffect(() => {
    console.log("2nd post changed");
  }, [post2]);

  useEffect(() => {
    console.log("1st post address changed");
  }, [post1Address]);

  useEffect(() => {
    console.log("2nd post address changed");
  }, [post2Address]);

  return (
    <div>
      <h1>Selectors</h1>
      <button onClick={() => posts.refetch()}>Refetch</button>
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
      >
        Invalidate
      </button>
      <button onClick={() => forceUpdate((i) => i + 1)}>Force Update</button>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && (
        <>
          <ul>
            {posts.data.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.views}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
