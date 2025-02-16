import { useQuery } from "@tanstack/react-query";

// Query key factories - Has Duplication
export const todoKeys = {
  allLists: () => ["todos", "list"],
  list: (sort: string) => ["todos", "list", sort],
};

// Query key factories + composition - Dealing with duplication but making keys less readable
export const todoKeysWithComposition = {
  allTodos: () => ["todos"],
  allLists: () => [...todoKeysWithComposition.allTodos(), "list"],
  list: (sort: string) => [...todoKeysWithComposition.allLists(), sort],
};

export const useTodos = (sort: string) => {
  return useQuery({
    /*
    Using keys on the go
    queryKey: ["todos", "list", sort],

    Using query key factories
    queryKey: todoKeys.list(sort),
    */
    queryKey: todoKeys.list(sort),
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${sort}`
      );
      const data = await response.json();
      return data;
    },
  });
};

// Query Factories - Just pay attention some returns array, Some returns objects
export const todos = {
  allTodos: () => ["todos"],
  allLists: () => [...todoKeysWithComposition.allTodos(), "list"],
  list: (sort: string) => ({
    queryKey: [...todoKeysWithComposition.allLists(), sort],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${sort}`
      );
      const data = await response.json();
      return data;
    },
    staleTime: 10 * 1000,
  }),
};

export const useTodosWithQueryFactory = (sort: string) => {
  return useQuery(todos.list(sort));
};

// Query Factories - Everything returns objects
export const todos2 = {
  allTodos: () => ({
    queryKey: ["todos"],
  }),
  allLists: () => ({
    queryKey: [...todoKeysWithComposition.allTodos(), "list"],
  }),
  list: (sort: string) => ({
    queryKey: [...todoKeysWithComposition.allLists(), sort],
    staleTime: 10 * 1000,
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${sort}`
      );
      const data = await response.json();
      return data;
    },
  }),
};
