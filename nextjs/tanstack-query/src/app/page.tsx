import { delay, fetchPaginatedPosts } from "@/api";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import PaginationControls from "@/components/pagination-control";
import PostsWithQuerySuspense from "@/components/posts-query-suspense";
import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
  const params = await searchParams;
  const currentPage = params.page || 1;

  queryClient.prefetchQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      console.log("prefetching posts for page", currentPage);
      await delay(10000);
      return fetchPaginatedPosts(currentPage);
    },
    staleTime: 1000 * 60,
  });

  return (
    <div>
      <Navbar />
      <h1>Page {currentPage}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...Suspense</div>}>
          <PostsWithQuerySuspense page={currentPage} />
        </Suspense>
      </HydrationBoundary>
      <PaginationControls />
      <Footer />
    </div>
  );
}
