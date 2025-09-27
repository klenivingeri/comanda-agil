import React, { useState } from "react";
import { isEmpty } from "../../app/utils/empty";
import Link from "next/link";

export const Button = React.memo(
  ({
    text = null,
    href = "",
    type = "",
    onClick = () => {},
    children,
    wFull = "",
    hFull = "",
    margin = "",
    padding = "",
    disabled = false,
    inline = false,
  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const Element = type || isEmpty(href) ? "button" : Link;
    const attrButton = { onClick, disabled, type };

    const handleSetIsPressed = (pressed) => {
      if (isPressed !== pressed) {
        setIsPressed(pressed);
      }
    };

    if (!isEmpty(href)) {
      attrButton.href = href;
    }
    const isDesktop = true;
    const buttonStyles = `
      relative text-white font-bold rounded-md shadow-sm
      ${!wFull ? "w-full" : wFull}
      ${
        disabled
          ? "bg-[var(--button-disabled)] border-b-4 border-b-[var(--button-progress)]"
          : `
      ${isDesktop ? "hover:bg-[var(--button-hover)] hover:border-b-2" : ""}
      ${
        isPressed
          ? "bg-[var(--button-hover)] border-b-2 border-b-[var(--button-focus)]"
          : "bg-[var(--button-default)] border-b-4 border-b-[var(--button-focus)]"
      }
      transition-all duration-70 ease-in-out
      `
      }
    `;

    if (inline) {
      return (
        <Element
          className={`${!hFull ? "h-11" : hFull}
          ${!wFull ? "w-full" : wFull}
          ${padding ? padding : ""}
          ${
            margin ? margin : ""
          } flex text-[var(--text-default)] text-xl justify-center items-center rounded-md border-1 border-[var(--button-disabled)]`}
        >
          {text}
        </Element>
      );
    }

    return (
      <div
        className={`flex flex-col justify-end content 
          ${!hFull ? "h-11" : hFull}
          ${!wFull ? "w-full" : wFull}
          ${margin ? margin : ""}`}
      >
        <Element
          onTouchStart={() => handleSetIsPressed(true)}
          onTouchEnd={() => handleSetIsPressed(false)}
          onMouseDown={() => handleSetIsPressed(true)}
          onMouseUp={() => handleSetIsPressed(false)}
          onMouseLeave={() => handleSetIsPressed(false)}
          className={buttonStyles}
          {...attrButton}
        >
          <div
            className={`border-b-1 border-[var(--button-disabled)] w-full flex justify-center items-center ${
              !hFull ? "h-11" : hFull
            } rounded-md`}
          >
            {!isEmpty(text) ? text : children}
          </div>
        </Element>
      </div>
    );
  }
);
