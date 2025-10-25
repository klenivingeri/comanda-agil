import React, { useEffect, useRef } from "react";
import { Loading } from "../loading/Loading";
export const Content = ({
  isLoading,
  children,
  error,
  padding = "p-2",
  newDiv = false,
  margin = "mt-[106px]",
  endPage,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const div = inputRef.current;
    if (div && endPage) {
      div.scrollTo({
        top: div.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [children]);

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
    <div
      ref={inputRef}
      className={`flex-1 overflow-auto ${margin} px-2 w-full min-w-0`}
      style={{ overflowWrap: "break-word" }}
    >
      {children}
    </div>
  );
};
