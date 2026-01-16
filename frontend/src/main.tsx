import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TasksContextProvider } from "./context/TasksContext.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </StrictMode>
);
