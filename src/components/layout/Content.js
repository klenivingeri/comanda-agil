import React from "react";
import { Loading } from "../loading/Loading";
export const Content = ({ isLoading, children, error, padding = "p-2" }) => {
  if (isLoading) {
    return (
      <div className="flex rounded p-2 h-full w-full justify-center items-center bg-[var(--backgroun)]">
        <Loading isLoading style="style4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex rounded p-2 h-full w-full justify-center items-center bg-[var(--backgroun)]">
        Ocorreu um erro durante o processamento, por favor dente novamente.
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-1 rounded ${padding} h-full`}>
      {children}
    </div>
  );
};
