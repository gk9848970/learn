import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const usePosts = () => {
  const countRef = useRef(0);

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      if (countRef.current > 2) {
        throw new Error(
          "This is an error inside react query from main component"
        );
      }
      countRef.current += 1;
      return "Gaurav";
    },
  });

  return query;
};

export const ErrorImperativeHandling = () => {
  return (
    <div>
      <h1>Resetting Error Boundary</h1>
      <ProblematicComponent />
      <ProblematicComponent />
      <button onClick={() => toast.success("Success")}>Success</button>
      <Toaster />
    </div>
  );
};

const ProblematicComponent = () => {
  const posts = usePosts();
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Problematic Component</h1>
      <button
        onClick={() => queryClient.refetchQueries({ queryKey: ["posts"] })}
      >
        Refetch
      </button>
      {posts.isLoading && <div>Loading</div>}
      {posts.isError && <div>Error</div>}
      {posts.isSuccess && <div>{posts.data}</div>}
    </div>
  );
};
