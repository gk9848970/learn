import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

let times = 0;

const useTodo = (id: string) =>
  useQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await response.json();
      times++;
      return data;
    },
    refetchInterval: () => {
      if (times === 3) {
        return false;
      }
      return 3000;
    },
  });

export function PollingData() {
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
