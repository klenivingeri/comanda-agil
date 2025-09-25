"use client";

import React, { useState, useRef } from "react";
import { MagnifyingGlass } from "../../../public/icons/MagnifyingGlass";
import { IconKeyBoard } from "../../../public/icons/KeyBoard";
import { IconKeyBoardNumeric } from "../../../public/icons/KeyBoardNumeric";
import { IconX } from "../../../public/icons/X";

export const InputSearch = ({ setInputText, _isNumeric = false }) => {
  const [isNumeric, setIsNumeric] = useState(_isNumeric);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);

  const handleInputText = (e) => {
    const text = e.target.value;
    setText(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setInputText(text);
    }, 500);
  };

  const handlerClearText = () => {
    setText("");
    setInputText("");
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNumericAndFocus = () => {
    setIsNumeric(!isNumeric);
    setTimeout(handleFocusInput, 100);
  };

  return (
    <div className="relative w-full h-12">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
        <MagnifyingGlass size="h-[25px] w-[25px]" />
      </span>

      <input
        autoComplete="off"
        ref={inputRef}
        type={isNumeric ? "tel" : "text"}
        placeholder="Pesquisar..."
        onChange={handleInputText}
        value={text || ""}
        className="w-full pl-10 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
      />
      {!!text.length && (
        <span
          onClick={handlerClearText}
          className="absolute inset-y-0 right-[40px] flex items-center pr-3"
        >
          <IconX size="h-[15px] w-[15px]" />
        </span>
      )}
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
    </div>
  );
};
