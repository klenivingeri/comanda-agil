"use client";
import React from "react";

export const Tabs = ({tabs, value, setValue}) => {
  return (
    <div className="relative">
    <div className="z-10 absolute w-full grid grid-cols-3 h-11 mt-4 rounded-full border-1 border-[var(--button-default)] ">
    {tabs.map((tab, i) => (
    <button
      key={i}
      className={`${
        value === tab.id ? "bg-[var(--button-default)] text-[var(--bg-component)] rounded-full" : ""
      } w-full col-span-1`}
      onClick={() => setValue(tab.id)}
    >
      {tab.title}
    </button>
  ))}</div>
  </div>
  );
};
