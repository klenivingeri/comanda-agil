import React from "react";
export const Header = ({ children, h = "h-[95px]" }) => {
  return (
    <header id="Header" className="fixed inset-x-0 w-full z-50">
      <div className="flex justify-center">
        <div
          className={`flex w-full max-w-[768px] ${h} bg-[var(--background)]`}
        >
          {children}
        </div>
      </div>
    </header>
  );
};
