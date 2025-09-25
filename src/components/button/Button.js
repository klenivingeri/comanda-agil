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
    margin = "",
    disabled = false,
  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const attrButton = {};

    if (!disabled) {
      attrButton.onClick = onClick;
      attrButton.type = type;

      if (!isEmpty(href)) {
        attrButton.href = href;
      }
    }
    const isDesktop = false;

    const Element = type || isEmpty(href) ? "button" : Link;

    return (
      <div
        className={`flex flex-col justify-end h-11 content 
          ${!wFull ? "w-full" : wFull}
          ${margin ? margin : ""}`}
      >
        <Element
          onTouchStart={() => setIsPressed(true)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          onTouchEnd={() => setIsPressed(false)}
          className={`relative
          text-white font-bold rounded-md shadow-sm
            ${!wFull ? "w-full" : wFull}
            ${
              disabled
                ? "bg-[var(--button-disabled)] border-b-4 border-b-[var(--button-progress)]"
                : `
            ${
              isDesktop ? "hover:bg-[var(--button-hover)] hover:border-b-2" : ""
            }
            ${
              isPressed
                ? "bg-[var(--button-hover)] border-b-2 border-b-[var(--button-focus)]"
                : "bg-[var(--button-default)] border-b-4 border-b-[var(--button-focus)]"
            }
            transition-all duration-70 ease-in-out
            `
            }
          `}
          {...attrButton}
        >
          <div className="border-b-1 w-full border-[var(--button-disabled)] flex justify-center items-center h-11 rounded-md">
            {!isEmpty(text) ? text : children}
          </div>
        </Element>
      </div>
    );
  }
);
