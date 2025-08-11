import React from "react";
export const Container = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen h-full w-full flex-1">
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};
