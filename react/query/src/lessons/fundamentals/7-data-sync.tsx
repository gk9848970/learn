import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useTodo = (id: string) =>
  useQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 60,
  });

export function DataSyncAndStaleTime() {
  const [id, setId] = useState(1);
  const { data: todo } = useTodo(id.toString());

  return (
    <div>
      <div>{id}</div>
      <button onClick={() => setId(id + 1)}>Increase</button>
      <button onClick={() => setId(id - 1)}>Decrease</button>
      {todo && <div>{todo.title}</div>}
    </div>
  );
}
