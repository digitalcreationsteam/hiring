// src/silence-errors.ts
export const silenceResizeObserver = () => {
  // Method 1: Override console
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes?.("ResizeObserver loop")) return;
    originalError(...args);
  };

  // Method 2: Catch via window error event
  const errorHandler = (event: ErrorEvent) => {
    if (event.message?.includes("ResizeObserver loop")) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  };
  window.addEventListener("error", errorHandler, true);

  // Method 3: Catch unhandled rejections
  const rejectionHandler = (event: PromiseRejectionEvent) => {
    if (event.reason?.message?.includes("ResizeObserver loop")) {
      event.preventDefault();
    }
  };
  window.addEventListener("unhandledrejection", rejectionHandler, true);

  // Return cleanup function
  return () => {
    window.removeEventListener("error", errorHandler, true);
    window.removeEventListener("unhandledrejection", rejectionHandler, true);
    console.error = originalError;
  };
};

// Auto-execute
silenceResizeObserver();
