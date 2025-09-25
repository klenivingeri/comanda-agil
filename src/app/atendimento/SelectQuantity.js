import React from "react";
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
            className=" flex justify-center content-center"
            onClick={handleRemove}
          >
            <button className="flex w-8 h-8  text-[var(--text-default)] text-xl justify-center items-center border-1 border-[var(--button-disabled)] ring-1 ring-[var(--button-focus)]/50 rounded-md ">
              -
            </button>
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
        className=" flex justify-center content-center"
        onClick={handleAdd}
      >
        <button className="flex w-8 h-8 text-white text-xl justify-center items-center bg-[var(--button-default)] rounded-md hover:bg-[var(--button-hover)] border-1 border-[var(--button-disabled)] ring-1 ring-[var(--button-focus)]/50">
          +
        </button>
      </div>
    </div>
  );
};
