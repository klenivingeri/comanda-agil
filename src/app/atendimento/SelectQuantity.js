"use client";

import React from "react";
import { ButtonContainer } from "../../components/button";
export const SelectQuantity = ({
  handleAdd,
  handleRemove,
  value,
  hideValue = false,
}) => {
  return (
    <div className="flex items-center justify-end mr-2">
      {value > 0 && (
        <>
          <div
            style={{ width: "40px" }}
            className="flex justify-center content-center mt-1"
            onClick={handleRemove}
          >
            <ButtonContainer
              wFull="w-9"
              hFull="h-8"
              text="-"
              style="buttonInline"
            />
          </div>
          {!hideValue ? (
            <div style={{ width: "40px" }}>
              <div className="flex w-full h-10 justify-center items-center text-4xl">
                {value}
              </div>
            </div>
          ) : (
            <div style={{ width: "6px" }}></div>
          )}
        </>
      )}
      <div
        style={{ width: "40px" }}
        className=" flex justify-center content-center mt-1"
        onClick={handleAdd}
      >
        <ButtonContainer wFull="w-9" hFull="h-8" text="+" />
      </div>
    </div>
  );
};
