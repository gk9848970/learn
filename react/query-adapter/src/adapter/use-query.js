import { QueryObserver } from "@tanstack/query-core";
import { useBaseQuery } from "./useBaseQuery";

export function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver, queryClient);
}
