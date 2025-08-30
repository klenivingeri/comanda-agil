import React from "react";
export const Footer = ({ children }) => {
  return (
    <footer
      id="Footer"
      className="fixed inset-x-0 bottom-0 w-full z-50 border-t-4 border-[var(--background)]"
    >
      <div className="flex justify-center">
        <div className="flex w-full md:max-w-[768px] shadow-lg bg-[var(--background)] h-[60px]">
          {children}
        </div>
      </div>
    </footer>
  );
};
