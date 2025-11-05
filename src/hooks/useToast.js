import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./toast.css";

let toastRoot;
const createToastRoot = () => {
  if (!toastRoot) {
    const div = document.createElement("div");
    document.body.appendChild(div);
    toastRoot = createRoot(div);
  }
  return toastRoot;
};

export const useToast = () => {
  const showToast = (message, type = "success", duration = 3000) => {
    const root = createToastRoot();
    const toastId = Date.now();

    const Toast = () => {
      const [visible, setVisible] = useState(true);

      setTimeout(() => setVisible(false), duration);

      if (!visible) return null;

      return <div className={`toast toast-${type} text-[var(--button-default)] bg-[var(--button-green-default)]/90`}>{message}</div>;
    };

    root.render(<Toast key={toastId} />);
  };

  return {
    success: (msg) => showToast(msg, "success"),
    error: (msg) => showToast(msg, "error"),
    info: (msg) => showToast(msg, "info"),
    warn: (msg) => showToast(msg, "warn"),
  };
};
