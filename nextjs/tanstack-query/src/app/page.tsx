import { fetchPaginatedPosts } from "@/api";
import PaginationControls from "@/components/pagination-control";
import PostsWithQueryPagination from "@/components/posts-query-pagination";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const queryClient = new QueryClient();
  const params = await searchParams;
  const currentPage = params.page || 1;

  await queryClient.prefetchQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPaginatedPosts(currentPage),
  });

  return (
    <div>
      <h1>Page {currentPage}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostsWithQueryPagination page={currentPage} />
      </HydrationBoundary>
      <PaginationControls />
    </div>
  );
}
