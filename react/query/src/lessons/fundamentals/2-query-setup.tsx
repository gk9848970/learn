import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistingMutations, togglePostRead } from "./38-persisting-mutations";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient();

queryClient.setMutationDefaults(["posts"], {
  mutationFn: async ({ id, newValue }: { id: number; newValue: boolean }) => {
    return await togglePostRead(id, newValue);
  },
});

const persister = createSyncStoragePersister({
  storage: localStorage,
});

export function QueryContext() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        return queryClient.resumePausedMutations();
      }}
    >
      <PersistingMutations />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
