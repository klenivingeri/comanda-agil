import React from "react";
export const Header = ({ children, bg = "--background" }) => {
  return (
    <header id="Header" className="fixed inset-x-0 w-full z-50">
      <div className="flex justify-center">
        <div className={`flex w-full max-w-[768px] h-[95px] bg-[var(${bg})]`}>
          {children}
        </div>
      </div>
    </header>
  );
};
