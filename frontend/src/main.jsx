import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "jotai";

/**
 * Renders the main React application component wrapped in a Jotai provider.
 * This is the entry point for the application, responsible for rendering the
 * top-level App component and setting up the global state management context.
 */
createRoot(document.getElementById("root")).render(
  <>
    <Provider>
      <App />
    </Provider>
  </>
);
