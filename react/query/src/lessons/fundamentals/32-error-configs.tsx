import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

const usePosts = (throwImmediately = false) => {
  const countRef = useRef(0);

  const query = useQuery({
    queryKey: ["posts", throwImmediately],
    queryFn: () => {
      if (throwImmediately) {
        throw new Error(
          "This is an error inside react query from main component immediately"
        );
      }

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

export const ErrorConfigs = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h1>Resetting Error Boundary</h1>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <ProblematicComponent immediately={true} />}
      <ProblematicComponent />
      <Toaster />
    </div>
  );
};

const ProblematicComponent = ({ immediately = false }) => {
  const posts = usePosts(immediately);
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Immediately Problematic Component</h1>
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
