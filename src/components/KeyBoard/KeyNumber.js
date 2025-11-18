"use client";

import React from "react";
import { currency } from "src/app/utils/currency";

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
    window.navigator.vibrate(10);
    if (typeof pressedValue === "number") {
      setValue((prevValue) => {
        const currentCents = Math.round(Number(prevValue) * 100) || 0;
        const currentDigits = String(currentCents);

        const newDigits = currentDigits + String(pressedValue);

        return Number(newDigits) / 100;
      });
    } else if (pressedValue === "clear") {
      // Se o seu valor final for Number, é melhor limpar para 0.
      setValue(0);
    } else if (pressedValue === "send") {
      send();
    }
  };

  return (
    <div className={`w-full grid grid-cols-12 mt-4`}>
      {key.map((keyPress, i) => (
        <button
          key={i}
          className={`w-full h-16 col-span-3 border-t-1 border-[var(--button-default)]/20 px-4`}
          onClick={() => handleKeyPress(keyPress)}
        >
          <ShowKey keyPress={keyPress} />
        </button>
      ))}
    </div>
  );
};
