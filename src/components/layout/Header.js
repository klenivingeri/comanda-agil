"use client";
import React, { useEffect, useState, useCallback } from "react";

export const HeaderGrid = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-12 px-2 h-[40px]">{children}</div>
  );
};

export const Header = ({ children, divider, h = "h-[104px]" }) => {
  const [showDivider, setShowDivider] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 4;
    setShowDivider(scrolled);
  }, []);

  useEffect(() => {
    if (!children) return;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [children, handleScroll]);

  if (!children) return null;
  return (
    <header id="Header" className="fixed inset-x-0 w-full z-10">
      <div className="flex justify-center">
        <div
          className={`flex flex-col justify-start pt-2 w-full max-w-[768px] ${h} bg-[var(--foreground)] ${
            (divider || showDivider) && "shadow"
          }`}
        >
          {children}
        </div>
      </div>
    </header>
  );
};
