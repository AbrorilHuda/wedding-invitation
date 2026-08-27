import React from "react";

interface ToastProps {
  message: string | null;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`toast ${visible ? "show" : ""}`}
      id="toast"
      data-testid="toast"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
