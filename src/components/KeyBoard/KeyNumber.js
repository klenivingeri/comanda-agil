"use client";

import React from "react";


const ShowKey = ({keyPress}) => {
  const show = {
    clear: 'x',
    send: '>>',
    empty: ' ',
  }

  return <div className="text-xl">{show[keyPress] || keyPress}</div>
}


export const KeyNumber = ({ setValue }) => {
  const key = [1, 2, 3, "clear", 4, 5, 6, "send", 7, 8, 9, "empty", "empty", 0, "empty", "empty"];
  const handleKeyPress = (value) => {
    if (typeof value === "number") setValue(value);
  };

  return (
    <div
      className={`w-full grid grid-cols-12 mt-4`}
    >
      {key.map((keyPress, i) => (
        <button
          key={i}
          className={`w-full h-20 col-span-3 border-t-1 border-[var(--button-default)]/20 px-4`}
          onClick={() => handleKeyPress(keyPress)}
        >
          <ShowKey keyPress={keyPress} />
          
        </button>
      ))}
    </div>
  );
};
