import { QueryClient } from "@tanstack/query-core";
import React, { use, useEffect } from "react";

const QueryContext = React.createContext(null);

export const QueryClientProvider = ({ children, client }) => {
  useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);

  return (
    <QueryContext.Provider value={client}>{children}</QueryContext.Provider>
  );
};

export const useQueryClient = () => {
  const context = React.useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryClient must be used within a QueryClientProvider");
  }
  return context as QueryClient;
};
