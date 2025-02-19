import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

/*
    Firstly queryFn will be called.
    If it throws error, then it will be retried.
    
    In retrying, Firstly delaay will be calculated.
    Then should it retry and how many times will be calculated.

    Query will stay in loading state until all retries are done.
    And then it will be said to be error.

    If we return Successful response, then it will be considered as success.
    And both retry and delay will be reset.
*/

const usePosts = (id: string) => {
  const timeRef = useRef<number | undefined>(undefined);
  const countRef = useRef(1);

  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      console.log("Fetching...");
      const now = Date.now();
      if (timeRef.current) {
        console.log(
          `Time difference for ${countRef.current} retry`,
          now - timeRef.current
        );

        countRef.current += 1;
      }
      timeRef.current = now;
      throw new Error("Error");
    },
    enabled: Boolean(id),
    retry: (failureCount, error) => {
      console.log("Retrying...", failureCount, error);
      if (failureCount === 3) {
        return false;
      }
      return true;
    },
    retryDelay: (failureCount) => {
      console.log("Retry delay...", failureCount);
      return failureCount * 1000;
    },
  });
};

export const Retries = () => {
  const [search, setSearch] = useState("");
  const posts = usePosts(search);

  return (
    <div>
      <h1>Retries</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>{posts.fetchStatus}</div>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && <div>Success</div>}
      <div>{posts.failureCount}</div>
      <div>{JSON.stringify(posts.failureReason)}</div>
    </div>
  );
};
