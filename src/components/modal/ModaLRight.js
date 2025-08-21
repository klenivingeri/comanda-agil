"use client";
import React, { useEffect, useState } from "react";

export const ModalRight = ({ handleOpenModal, openModal, children }) => {
  const [hidden, setHidden] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (openModal) {
      setHidden(false);

      // espera um tick antes de animar (pra tirar o hidden primeiro)
      const t = setTimeout(() => setAnimating(true), 50);
      return () => clearTimeout(t);
    } else {
      setAnimating(false);
    }
  }, [openModal]);

  return (
    <div
      className={`
        absolute right-0 top-0 h-full bg-[var(--background)] z-[100]
        transition-all duration-300 ease-in-out
        ${openModal && animating ? "w-full opacity-100" : "w-0 opacity-0"}
        ${hidden ? "hidden" : ""}
      `}
      onTransitionEnd={() => {
        if (!openModal) setHidden(true);
      }}
    >
      {/* Container do conteúdo com rolagem */}
      <div className="w-full h-full flex flex-col overflow-auto">
        <div onClick={handleOpenModal} className="p-4">
          XXX
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
