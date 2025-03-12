import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppOriginal } from "./App-original.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppOriginal />
    {/* <App /> */}
  </StrictMode>
);
