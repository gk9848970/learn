import { useQueryClient } from "../adapter/query-client-provider";

export const Posts = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);
  return <div>Posts</div>;
};
