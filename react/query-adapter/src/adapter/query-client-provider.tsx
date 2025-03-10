import React from "react";

const QueryContext = React.createContext(null);

export const QueryClientProvider = ({ children, client }) => {
  return (
    <QueryContext.Provider value={client}>{children}</QueryContext.Provider>
  );
};

export const useQueryClient = () => {
  const context = React.useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryClient must be used within a QueryClientProvider");
  }
  return context;
};
