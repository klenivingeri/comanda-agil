import React from "react";
export const SelectQuantity = ({
  handleAdd,
  handleRemove,
  value,
  hide = false,
}) => {
  return (
    <div className="flex items-center justify-end mr-2">
      {value > 0 && (
        <>
          <div style={{ width: "40px" }}>
            <button
              className="flex w-full h-10 text-xl justify-center items-center border-x-2 border-x-gray-400 border-t-2 border-b-2 border-t-gray-300 border-b-gray-500 rounded-md"
              onClick={handleRemove}
            >
              -
            </button>
          </div>
          {!hide ? (
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
      <div style={{ width: "40px" }}>
        <button
          className="flex w-full h-10 text-white text-xl justify-center items-center border-t-2 border-b-4 border-t-gray-500 bg-gray-700 border-b-gray-800 rounded-md"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
    </div>
  );
};
