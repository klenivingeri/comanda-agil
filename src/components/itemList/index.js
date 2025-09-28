import React from "react";

export const ItemList = ({ children, m, p }) => {
  return (
    <div
      className={`flex h-14 items-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50
        ${m ?? m} ${p ?? p}`}
    >
      {children}
    </div>
  );
};
