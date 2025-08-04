"use client";
import { useState, useRef } from "react";
import { MagnifyingGlass } from "../../../public/icons/MagnifyingGlass";
import { IconKeyBoard } from "../../../public/icons/KeyBoard";
import { IconKeyBoardNumeric } from "../../../public/icons/KeyBoardNumeric";
import { IconX } from "../../../public/icons/X";

export const InputSearch = () => {
  const [isNumeric, setIsNumeric] = useState();

  const handlerNumeric = () => {
    setIsNumeric(!isNumeric);
  };
  // Ref para o input
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNumericAndFocus = () => {
    handlerNumeric();
    setTimeout(handleFocusInput, 0);
  };

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <MagnifyingGlass size="h-[25px] w-[25px]" />
      </span>

      <input
        autocomplete="off"
        ref={inputRef}
        type={isNumeric ? "tel" : "text"}
        placeholder="Pesquisar..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
      <span
        onClick={handleNumericAndFocus}
        className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 w-10"
      >
        {isNumeric ? (
          <IconKeyBoard size="h-[25px] w-[25px]" />
        ) : (
          <IconKeyBoardNumeric size="h-[18px] w-[18px]" />
        )}
      </span>
      <span className="absolute inset-y-0 right-[40px] flex items-center pr-3">
        <IconX size="h-[15px] w-[15px]" />
      </span>
    </div>
  );
};
