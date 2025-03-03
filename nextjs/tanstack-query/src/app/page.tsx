import { fetchPaginatedPosts } from "@/api";
import PaginationControls from "@/components/pagination-control";
import PostsWithQueryPagination from "@/components/posts-query-pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const params = await searchParams;
  const currentPage = params.page || 1;
  const posts = await fetchPaginatedPosts(currentPage);

  return (
    <div>
      <h1>Page {currentPage}</h1>
      <PostsWithQueryPagination initialData={posts} page={currentPage} />
      <PaginationControls />
    </div>
  );
}
