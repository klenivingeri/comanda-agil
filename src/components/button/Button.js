import React, { useState } from "react";
import { isEmpty } from "../../app/utils/empty";
import Link from "next/link";

const colors = (_color = "-") => {
  const color = _color !== "-" ? `-${_color}-` : "-";
  return {
    default: `--button${color}default`,
    hover: `--button${color}hover`,
    focus: `--button${color}focus`,
    pressed: `--button${color}pressed`,
    disabled: `--button${color}disabled`,
    progress: `--button${color}progress`,
  };
};

const getButtonStyles = (disabled, isPressed, color) => {
  const c = colors(color);
  console.log(c);
  if (disabled) {
    return {
      background: `var(${c.disabled})`,
      borderBottom: `4px solid var(${c.progress})`,
      borderDivider: `var(${c.disabled})`,
    };
  }

  if (isPressed) {
    return {
      background: `var(${c.hover})`,
      borderBottom: `2px solid var(${c.pressed})`,
      borderDivider: `var(${c.progress})`,
    };
  }

  return {
    background: `var(${c.default})`,
    borderBottom: `4px solid var(${c.pressed})`,
    borderDivider: `var(${c.progress})`,
  };
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
    color,
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

    const buttonStyles = getButtonStyles(disabled, isPressed, color);

    if (inline) {
      return (
        <Element
          style={{ border: `1px solid ${buttonStyles.background}` }}
          className={`${!hFull ? "h-11" : hFull}
          ${!wFull ? "w-full" : wFull}
          ${padding ? padding : ""}
          ${
            margin ? margin : ""
          } flex text-[var(--text-default)] text-xl justify-center items-center rounded-md `}
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
          className={`relative text-white font-bold rounded-md shadow-sm transition-all duration-70 ease-in-out cursor-pointer ${
            !wFull ? "w-full" : wFull
          }`}
          style={buttonStyles}
          {...attrButton}
        >
          <div
            className={`border-b w-full flex justify-center items-center ${
              !hFull ? "h-11" : hFull
            } rounded-md`}
            style={{ borderColor: buttonStyles.borderDivider }}
          >
            {!isEmpty(text) ? text : children}
          </div>
        </Element>
      </div>
    );
  }
);
