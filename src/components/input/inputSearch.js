"use client";

import React, { useState, useRef } from "react";
import { MagnifyingGlass } from "../../../public/icons/MagnifyingGlass";
import { IconKeyBoard } from "../../../public/icons/KeyBoard";
import { IconKeyBoardNumeric } from "../../../public/icons/KeyBoardNumeric";
import { IconX } from "../../../public/icons/X";

export const InputSearch = ({
  setInputText,
  _isNumeric = false,
  searchFull,
  setSearchFull,
  handleFormSubmit,
  mini = false,
}) => {
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
      setSearchFull(true);
    }
  };

  const handleNumericAndFocus = () => {
    setIsNumeric(!isNumeric);
    setTimeout(handleFocusInput, 100);
  };

  const handleOnblur = () => {
    setSearchFull(false);
  };

  const handleForm = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <form
      onSubmit={handleForm}
      className={`relative transition-all duration-70 ease-in-out h-11  ${
        !mini || searchFull ? "w-full" : "w-11"
      }`}
    >
      <span
        className="absolute inset-y-0 left-0 flex items-center pl-2 text-[var(--button-default)]"
        onClick={handleFocusInput}
      >
        <MagnifyingGlass size="h-[25px] w-[25px]" />
      </span>

      <input
        autoComplete="off"
        ref={inputRef}
        type={isNumeric ? "tel" : "text"}
        placeholder={searchFull ? "Filtrar..." : ""}
        onBlur={handleOnblur}
        onChange={handleInputText}
        value={mini && !searchFull ? "" : text || ""}
        className={` ${
          searchFull
            ? "pl-10 pr-10 py-2 bg-[var(--input-default)]"
            : "bg-transparent border-transparent"
        } w-full h-11 border  rounded-lg focus:ring-1 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none  text-black`}
      />
      {!!text.length && (
        <span
          onClick={handlerClearText}
          className="absolute inset-y-0 right-[40px] flex items-center pr-3"
        >
          <IconX size="h-[15px] w-[15px]" />
        </span>
      )}
      {!mini || searchFull && (
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
      )}
      <button
        type="submit"
        className="bg-transparent w-0 text-transparent border-none p-0 m-0 hidden"
      ></button>
    </form>
  );
};
