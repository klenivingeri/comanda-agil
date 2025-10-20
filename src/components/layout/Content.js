import React from "react";
import { Loading } from "../loading/Loading";
export const Content = ({
  isLoading,
  children,
  error,
  padding = "p-2",
  newDiv = false,
}) => {
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
  if (newDiv) {
    return (
      <div className="relative w-full h-full flex flex-col overflow-auto">
        <div className="flex-1 overflow-auto mt-[106px] mb-[180px p-2">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-1 rounded ${padding} h-full `}>
      {children}
    </div>
  );
};
