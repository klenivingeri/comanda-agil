"use client";
import { useState } from "react";
import { currency } from "../utils/currency";
import { SelectQuantity } from "./SelectQuantity";

export const Item = ({ item }) => {
  const [value, setValue] = useState(0);

  const handleAdd = () => {
    setValue((value) => value + 1);
  };
  const handleRemove = () => {
    setValue((value) => {
      const result = value - 1;

      return result <= 0 ? 0 : result;
    });
  };
  return (
    <div className=" flex my-2 content-center bg-white items-center justify-between border-2 border-white border-l-4 rounded-md shadow-lg shadow-gray-100/50">
      <div className="truncate w-full flex flex-col">
        <span className="font-semibold truncate mr-2">
          {item.id} - {item.name}
        </span>
        <span className="">{currency(item.price)}</span>
      </div>
      <SelectQuantity
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        value={value}
      />
    </div>
  );
};
