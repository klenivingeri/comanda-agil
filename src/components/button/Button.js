import React from "react";
import { isEmpty } from "../../app/utils/empty";
import Link from "next/link";

export const Button = ({
  text = null,
  href = "/",
  type = "",
  onClick = null,
  children,
  isWFull = true,
  margin = "",
  disabled = false,
}) => {
  const attr = disabled
    ? {}
    : {
        href,
        onClick,
        type,
      };

  return (
    <div
      className={`flex w-full flex-col justify-end h-13 ${
        margin ? margin : ""
      }`}
    >
      {type ? (
        <button
          className={`
          text-white font-bold rounded-md shadow-sm
            ${isWFull ? "w-full" : ""}
            ${
              disabled
                ? "bg-[var(--button-disabled)]"
                : `
            bg-[var(--button-default)] 
            border-b-4 border-b-[var(--button-focus)]
            transition-all duration-100 ease-in-out
            hover:bg-[var(--button-hover)] 
            hover:border-b-2
            active:bg-[var(--button-focus)]
            `
            }
          `}
          {...attr}
        >
          <div className="border-b-1 w-full border-[var(--button-disabled)] py-3 px-4 rounded-md">
            {!isEmpty(text) ? text : children}
          </div>
        </button>
      ) : (
        <Link
          className={`
          text-white font-bold rounded-md shadow-sm
            ${isWFull ? "w-full" : ""}
            ${
              disabled
                ? "bg-[var(--button-disabled)]"
                : `
                  bg-[var(--button-default)] 
                  border-b-4 border-b-[var(--button-focus)]
                  transition-all duration-100 ease-in-out
                  hover:bg-[var(--button-hover)] 
                  hover:border-b-2
                  active:bg-[var(--button-focus)]
                `
            }

          `}
          {...attr}
        >
          <div className="flex border-b-1 w-full border-[var(--button-disabled)] py-3 px-4 rounded-md justify-center">
            {!isEmpty(text) ? text : children}
          </div>
        </Link>
      )}
    </div>
  );
};
