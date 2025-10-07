import React from "react";
export const Container = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full flex-1 h-full bg-[var(--foreground)]">
      <main className="flex-1 flex flex-col h-full">{children}</main>
    </div>
  );
};
