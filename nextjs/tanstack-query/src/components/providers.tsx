"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useRef } from "react";
import PostsWithServer from "./posts-server";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = useRef<undefined | QueryClient>(undefined);
  const [count, setCount] = React.useState(0);

  if (!queryClient.current) {
    queryClient.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
      {count > 0 && <PostsWithServer />}
      <button onClick={() => setCount((c) => c + 1)}>Add Posts</button>
    </QueryClientProvider>
  );
}
