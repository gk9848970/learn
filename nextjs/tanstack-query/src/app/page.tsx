import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import PaginationControls from "@/components/pagination-control";
import PostsWithQuerySuspense from "@/components/posts-query-suspense";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const params = await searchParams;
  const currentPage = params.page || 1;

  return (
    <div>
      <Navbar />
      <h1>Page {currentPage}</h1>

      <Suspense fallback={<div>Loading...Suspense</div>}>
        <PostsWithQuerySuspense page={currentPage} />
      </Suspense>

      <PaginationControls />
      <Footer />
    </div>
  );
}
