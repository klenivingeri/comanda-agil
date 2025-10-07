import React from "react";

export const IconDotMenu = ({ size = "w-6 h-6" }) => {
  return (
    <svg
      className={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M4 8H20M4 16H12"
        stroke="currentColor" // 🔥 herda cor do texto
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
