import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/*
Another approach can be to get rid of enabled flag and conditionally
render the component which uses the query hook.
*/
const useTodo = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await response.json();
      return data;
    },
    enabled,
  });

export function FetchOnDemand() {
  const [id, setId] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const { data: todo } = useTodo(id.toString(), enabled);

  return (
    <div>
      <div>{id}</div>
      <button onClick={() => setId(id + 1)}>Increase</button>
      <button onClick={() => setId(id - 1)}>Decrease</button>
      {todo && <div>{todo.title}</div>}
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Disable" : "Enable"}
      </button>
    </div>
  );
}
