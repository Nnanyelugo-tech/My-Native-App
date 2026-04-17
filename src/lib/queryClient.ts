import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

const clientStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.remove(key);
  },
};

export const persister = createAsyncStoragePersister({
  storage: clientStorage,
});

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error("Global Mutation Error:", error)
  }),
  mutationCache: new MutationCache({
    onError: (error) => console.error("Global Mutation Error:", error),
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 2,
    },
  },
});
