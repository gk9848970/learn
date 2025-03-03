"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function PaginationControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handlePageChange = (newPage: number) => {
    router.push(`${pathname}?${createQueryString("page", newPage.toString())}`);
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>

      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}
