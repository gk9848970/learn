import { QueryClient, useIsRestoring } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PersistingQueries } from "./36-persisting-queries";
import { defaultShouldDehydrateQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  /*
    The storage can exceed the alloted quota, When a error happens
    Retry will keep happeneing until undefined is returned.
    Here we are trying for storing just the newest query.

    We can even use retry strategy given by react-query
    import { removeOldestQuery } from "@tanstack/react-query-persist-client";
    retry: removeOldestQuery,
  */
  retry: ({ persistedClient, error, errorCount }) => {
    const sortedQueries = [...persistedClient.clientState.queries].sort(
      (a, b) => b.state.dataUpdatedAt - a.state.dataUpdatedAt
    );

    const newestQuery = sortedQueries[0];

    if (!newestQuery || errorCount > 1) {
      return undefined;
    }

    return {
      ...persistedClient,
      clientState: {
        ...persistedClient.clientState,
        queries: [newestQuery],
      },
    };
  },
});

function PersistGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const isRestoring = useIsRestoring();
  return isRestoring ? fallback : children;
}

export function QueryContext() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        /*
        Storage gets saved with a timestamp,
        So using max age can determine if the data stored should be used or not
        If a query gets garbage collected, Then it will be removed from storage as well.
        so gc must always be greater than or equal to maxAge
        */
        // maxAge: 1000 * 5,
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            if (defaultShouldDehydrateQuery(query) === false) return false;
            if (query.queryKey[0] === "comments") return true;
            if (query.meta?.persist) return true;
            return false;
          },
        },
      }}
    >
      <PersistGate
        fallback={
          <div style={{ padding: 20 }}>
            <h1>Loading...</h1>
          </div>
        }
      >
        <PersistingQueries />
      </PersistGate>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
