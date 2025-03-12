import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppOriginal } from "./App-original.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AppOriginal /> */}
    <App />
  </StrictMode>
);
