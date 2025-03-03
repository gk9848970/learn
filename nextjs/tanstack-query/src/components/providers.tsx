"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useRef } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = useRef<undefined | QueryClient>(undefined);

  if (!queryClient.current) {
    queryClient.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 10,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
