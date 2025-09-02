import React from "react";
import { Loading } from "../loading/Loading";
export const Content = ({ isLoading, children, padding = "p-2" }) => {
  if (isLoading) {
    return (
      <div className="flex rounded p-2 h-full w-full justify-center items-center bg-[var(--backgroun)]">
        <Loading isLoading style="style4" />
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-1 rounded ${padding} h-full`}>
      {children}
    </div>
  );
};
