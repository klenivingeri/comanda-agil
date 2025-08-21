"use client";

import React, { useState, useEffect } from "react";
import { currency } from "../utils/currency";
import { SelectQuantity } from "./SelectQuantity";

export const Item = ({
  item,
  handleRemoveItemsSelected,
  handleUpdateItemsSelected,
}) => {
  const handleAdd = () => {
    if (item?.quantity) {
      handleUpdateItemsSelected(item, item.quantity + 1);
    } else {
      handleUpdateItemsSelected(item, 1);
    }
  };

  const handleRemove = () => {
    handleUpdateItemsSelected(item, item.quantity - 1);
  };

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
        value={item?.quantity || 0}
      />
    </div>
  );
};
