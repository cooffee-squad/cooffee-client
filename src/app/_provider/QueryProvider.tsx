"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (_, query) => {
            console.log("Error", query);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 2 * 1000,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 1,
          },
          mutations: {
            onError: () => {
              console.log("Mutation Error");
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
