import React from "react";
export const Footer = ({
  children,
  bg = "bg-[var(--foreground)]",
  h = "h-[70px]",
}) => {
  return (
    <footer id="Footer" className="fixed inset-x-0 bottom-0 w-full z-10">
      <div className="flex justify-center">
        <div
          className={`flex w-full md:max-w-[768px] shadow-lg ${bg} ${h} pt-3`}
        >
          {children}
        </div>
      </div>
    </footer>
  );
};
