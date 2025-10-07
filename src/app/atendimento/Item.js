"use client";

import React from "react";
import { currency } from "../../app/utils/currency";
import { SelectQuantity } from "./SelectQuantity";

export const Item = ({
  item,
  handleUpdateItemsSelected,
  hiddeSelectQuantity,
  itemInNote = false,
  hideValue,
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
    <div className=" flex my-2 py-2 content-center bg-[var(--bg-component)] items-center justify-between border-2 border-[var(--bg-subTitle)]  rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
      {itemInNote ? (
        <div className="text-3xl min-w-[50px] max-w-[50px] text-shadow-md shadow-[var(--bg-subTitle)]/50 flex justify-center content-center">
          {item?.quantity}
        </div>
      ) : (
        ""
      )}
      <div className="truncate w-full flex flex-col px-2 py-1 ">
        <span className="font-semibold truncate text-sm mr-2">
          {item.code} - {item.name}
        </span>
        <span className="text-xs mt-[-2px] text-gray-500">
          {currency(item.price)}
        </span>
      </div>
      {!hiddeSelectQuantity && (
        <SelectQuantity
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          value={item?.quantity || 0}
          hideValue={hideValue}
        />
      )}
    </div>
  );
};
