import React, { useEffect, useRef } from "react";
import { Loading } from "../loading/Loading";
export const Content = ({
  isLoading,
  children,
  error,
  mb = "",
  endPage,
  pb = "",
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
      <div className="flex rounded p-2 h-full w-full justify-center items-center bg-[var(--background)]">
        <Loading isLoading style="style4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex rounded p-2 h-full w-full justify-center items-center bg-[var(--background)]">
        Nenhum retorno encontrado.
      </div>
    );
  }

  return (
    <div
      ref={inputRef}
      className={`flex-1 overflow-auto ${mb} ${pb} mt-[56px] px-2 w-full min-w-0`}
      style={{ overflowWrap: "break-word" }}
    >
      <div className="grid grid-cols-1 pt-2">
      {children}
    </div>
    </div>
  );
};
