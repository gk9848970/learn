import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryContext } from "./lessons/fundamentals/query-setup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryContext />
  </StrictMode>
);
