import React from "react";
export const Footer = ({ children }) => {
  return (
    <footer id="Footer" className="fixed inset-x-0 bottom-0 w-full z-10">
      <div className="flex justify-center">
        <div className="flex w-full md:max-w-[768px] shadow-lg bg-[var(--foreground)] h-[70px] pt-3">
          {children}
        </div>
      </div>
    </footer>
  );
};
