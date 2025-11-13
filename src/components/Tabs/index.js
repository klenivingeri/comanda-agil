"use client";
import React from "react";

export const Tabs = ({tabs, value, setValue}) => {

  const gridCols = `grid-cols-${tabs.length}` 

  return (
    <div className="relative">
    <div className={` w-full grid ${gridCols} mt-4 rounded-full border-1 border-[var(--button-default)] `}>
    {tabs.map((tab, i) => (
    <button
      key={i}
      className={`${
        value === tab.id ? "bg-[var(--button-default)] text-[var(--bg-component)] rounded-full" : ""
      } w-full col-span-1 px-4`}
      onClick={() => setValue(tab.id)}
    >
      {tab.title}{}
    </button>
  ))}</div>
  </div>
  );
};
