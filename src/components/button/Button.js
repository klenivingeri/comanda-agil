import React from "react";
import { isEmpty } from "../../app/utils/empty";
import Link from "next/link";

export const Button = ({
  text = null,
  href = "",
  onClick = null,
  children,
  isWFull = true,
}) => {
  const attr = {
    href,
    onClick,
  };

  return (
    <Link
      className={`flex justify-center text-white shadow-sm font-bold py-3 px-4 rounded-md ${
        isWFull ? "w-full" : ""
      } m-2 bg-[var(--button-default)] hover:bg-[var(--button-hover)] border-1 border-[var(--button-disabled)] ring-1 ring-[var(--button-focus)]/50`}
      {...attr}
    >
      {!isEmpty(text) ? text : children}
    </Link>
  );
};
