import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryContext } from "./lessons/fundamentals/2-query-setup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryContext />
  </StrictMode>
);
