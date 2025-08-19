"use client";

import React, { useState, useEffect } from "react";
import { currency } from "../utils/currency";
import { SelectQuantity } from "./SelectQuantity";

export const Item = ({
  item,
  handleAddTotalItemsInTheCategiry = () => {},
  handleRemoveTotalItemsInTheCategiry = () => {},
  handleRemoveItemsSelected,
  handleUpdateItemsSelected,
  itemsSelected,
}) => {
  const [value, setValue] = useState(0);

  const handleAdd = () => {
    setValue((value) => value + 1);
    handleAddTotalItemsInTheCategiry();
    handleUpdateItemsSelected(item, value);
  };

  const handleRemove = () => {
    setValue((value) => {
      const result = value - 1;
      return result <= 0 ? 0 : result;
    });
    handleRemoveTotalItemsInTheCategiry();
  };

  useEffect(() => {
    if (value <= 0) {
      handleRemoveItemsSelected(item.id);
    } else {
      handleUpdateItemsSelected(item, value);
    }
  }, [value]);

  const _value = itemsSelected.find((i) => i.id == item.id);

  return (
    <div className=" flex my-2 content-center bg-white items-center justify-between border-2 border-white border-l-4 rounded-md shadow-lg shadow-gray-100/50">
      <div className="truncate w-full flex flex-col px-2 py-1 ">
        <span className="font-semibold truncate text-lg mr-2">
          {item.id} - {item.name}
        </span>
        <span className="text-sm mt-[-2px] text-gray-500">
          {currency(item.price)}
        </span>
      </div>
      <SelectQuantity
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        value={_value?.quantity || 0}
      />
    </div>
  );
};
