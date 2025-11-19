"use client";

import React from "react";

const ShowKey = ({ keyPress }) => {
  const show = {
    clear: "x",
    send: ">>",
    empty: " ",
  };

  return <div className="text-xl">{show[keyPress] || keyPress}</div>;
};

export const KeyNumber = ({ setValue, send }) => {
  const key = [
    1,
    2,
    3,
    "clear",
    4,
    5,
    6,
    "send",
    7,
    8,
    9,
    "empty",
    "empty",
    0,
    "empty",
    "empty",
  ];

  const handleKeyPress = (pressedValue) => {
    if (pressedValue === "clear") {
      setValue(0);
    } else if (pressedValue === "send") {
      send();
    } else {
      setValue((prevValue) => {
        const MAX_CENT_LIMIT = 9999999;
        const currentCents = Math.round(Number(prevValue) * 100) || 0;
        const currentDigits = String(currentCents);
        const newDigits = currentDigits + String(pressedValue);
        const newCentsValue = Number(newDigits);
        if (newCentsValue > MAX_CENT_LIMIT) {
          return prevValue;
        }

        return newCentsValue / 100;
      });
    }
  };

  return (
    <div className={`w-full grid grid-cols-12 mt-4`}>
      {key.map((keyPress, i) => (
        <button
          key={i}
          className={`w-full h-16 col-span-3 border-t border-[var(--button-default)]/20 px-4 cursor-pointer hover:bg-[var(--button-default)]/10`}
          onClick={() => handleKeyPress(keyPress)}
        >
          <ShowKey keyPress={keyPress} />
        </button>
      ))}
    </div>
  );
};
