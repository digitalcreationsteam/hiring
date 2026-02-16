import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";

// Completely silence ResizeObserver errors
const silenceResizeObserverError = () => {
  // Store original console.error
  const originalError = console.error;

  // Override console.error
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("ResizeObserver loop")
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  // Silence error events
  window.addEventListener(
    "error",
    (e) => {
      if (e.message && e.message.includes("ResizeObserver loop")) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    },
    true,
  );

  // Silence unhandled rejections
  window.addEventListener("unhandledrejection", (e) => {
    if (
      e.reason &&
      e.reason.message &&
      e.reason.message.includes("ResizeObserver loop")
    ) {
      e.preventDefault();
    }
  });
};

// Execute the silence function
silenceResizeObserverError();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
