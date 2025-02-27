import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const QueryAndWebSockets = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { queryKey } = JSON.parse(event.data);
      queryClient.invalidateQueries(queryKey);
    };

    const ws = new WebSocket("ws://localhost:3000/ws");
    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.close();
    };
  }, [queryClient]);

  return <div>Query and WebSockets</div>;
};
