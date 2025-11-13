import React, { useState } from "react";
import { isEmpty } from "../../app/utils/empty";
import Link from "next/link";
import { getButtonStyles } from "./constants";

const vibrate = () => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(10);
  }
};

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
    style = "buttonDefault",
    vibre = "on",
    press = false,
    inline,
    _config,
  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const Element = type || isEmpty(href) ? "button" : Link;
    const isInline = style === 'buttonInline'
    const handlerClick = (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      _config.hasVibrate === vibre && vibrate();

      onClick(e);
    };

    const attrButton = { onClick: handlerClick, disabled, type };

    const handleSetIsPressed = (pressed) => {
      if (isPressed !== pressed) {
        setIsPressed(pressed);
      }
    };

    if (!isEmpty(href)) {
      attrButton.href = href;
      attrButton.prefetch = true;
    }

    const buttonStyles = getButtonStyles({
      style,
      wFull,
      press,
      isPressed,
      disabled,
    });

    if (inline) {
      return (
        <Element
          {...attrButton}
          className={`${!hFull ? "h-11" : hFull}
          ${!wFull ? "w-full" : wFull}
          ${padding ? padding : ""}
          ${
            margin ? margin : ""
          } flex text-[var(--text-default)] justify-center font-bold items-center rounded-md border-1 border-[var(--button-disabled)]`}
        >
          {!isEmpty(text) ? text : children}
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
            className={`border-b-1 ${isInline ? 'border-b-transparent' : 'border-white/20' } w-full flex justify-center items-center ${
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
